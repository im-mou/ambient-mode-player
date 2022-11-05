#!/usr/bin/env node
const crypto = require('crypto');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

var argv = require('yargs/yargs')(process.argv.slice(2))
    .usage('Usage: yarn generate:thumbnails [options]')
    .example('yarn generate:thumbnails --file ./videos/foo.mp4')
    .alias('f', 'file')
    .nargs('f', 1)
    .describe('f', 'Load a file')
    .demandOption(['f'])
    .alias('o', 'output')
    .nargs('o', 1)
    .describe('o', 'Output folder')
    .demandOption(['o'])
    .help('h')
    .alias('h', 'help').argv;

const extractThumbnails = async (inputPath, outputPath, filename) => {
    let fileHash = crypto.createHash('md5').update(filename).digest('hex');
    const thumbnailsDir = `${outputPath}/${fileHash}`;

    // create dir for thumbnails
    if (!fs.existsSync(thumbnailsDir)) {
        fs.mkdirSync(thumbnailsDir);
    }

    console.log('Input path:', path.resolve(inputPath));
    console.log('Output path: ', path.resolve(thumbnailsDir));

    // https://stackoverflow.com/a/53531794
    ffmpeg(inputPath)
        .on('start', () => {
            console.log('Extracting thumbnails...');
        })
        .on('end', () => {
            console.log('Done!');
            Promise.resolve();
        })
        .on('error', Promise.reject)
        .output(`${thumbnailsDir}/%d.jpg`)
        // fps=1: 1 frame every 1 second
        // scale=80:-1: resolution of 80p
        // tile=10x10: 100 screenshots per jpg file
        // -q:v 69: quality set to 69. 0=best, 69=worst?
        .outputOptions('-q:v', '10', '-vf', 'fps=1,scale=80:-1,tile=10x10,eq=saturation=1.5')
        .run();
};

(async function () {
    const inputPath = path.resolve(`${process.env.NODE_PATH}/${argv.f}`);
    const outputPath = path.resolve(`${process.env.NODE_PATH}/${argv.o}/thumbnails`);

    if (!fs.lstatSync(inputPath).isFile()) return;
    if (!fs.lstatSync(outputPath).isDirectory()) return;

    const filename = path.basename(inputPath);
    await extractThumbnails(inputPath, outputPath, filename);
})();
