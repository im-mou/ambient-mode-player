import { BUFFER_FRAMES, THUMBNAILS_SHEET_WIDTH, THUMBNAIL_WIDTH } from './constants';
import { videoEl } from './video';

const image = new Image();
const immersiveEl = document.querySelector('.immersive')!;
const getCanvas = () => document.querySelectorAll('.immersive canvas')!;

export const setThumbnailsImage = (thumbnailSheet: number) => {
    image.src = `thumbnails/${videoEl.dataset.hash}/${thumbnailSheet}.jpg`;
};

export const setCanvasAttrs = (canvas: HTMLCanvasElement) => {
    const scaling = THUMBNAILS_SHEET_WIDTH / videoEl.clientWidth;
    const width = THUMBNAILS_SHEET_WIDTH / 10;
    const height = (videoEl.clientHeight * scaling) / 10;

    canvas.height = height;
    canvas.width = width;
};

const getFrameCoords = (height: number, width: number, second: number) => {
    const scaling = THUMBNAILS_SHEET_WIDTH / width;
    const framesMaxSeconds = (Math.floor(second / BUFFER_FRAMES) * BUFFER_FRAMES) % 100;

    const x = (framesMaxSeconds % 10) * THUMBNAIL_WIDTH;
    const y =
        Math.floor((framesMaxSeconds * THUMBNAIL_WIDTH) / THUMBNAILS_SHEET_WIDTH) *
        ((height * scaling) / 10);

    return { x, y };
};

const getCoords = (
    (videoEl: HTMLVideoElement) => (seconds: number) =>
        getFrameCoords(videoEl.clientHeight, videoEl.clientWidth, seconds)
)(videoEl);

const draw = (canvas: HTMLCanvasElement, x: number, y: number) => {
    canvas
        .getContext('2d')!
        .drawImage(image, x, y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
};

export const updateCanvas = (seconds: number) => {
    const { x, y } = getCoords(seconds + BUFFER_FRAMES);
    if (seconds === 1) {
        const { x: xS, y: yS } = getCoords(seconds);
        const firstCanvas = document.createElement('canvas');
        setCanvasAttrs(firstCanvas);
        immersiveEl.appendChild(firstCanvas);
        draw(firstCanvas, xS, yS);
    }

    if (seconds % BUFFER_FRAMES === 0) {
        const canvas = document.createElement('canvas');
        setCanvasAttrs(canvas);
        immersiveEl.appendChild(canvas);
        draw(canvas, x, y);

        const canvasList = getCanvas();
        if (canvasList.length > 2) {
            canvasList.item(0).remove();
        }
    }
};
