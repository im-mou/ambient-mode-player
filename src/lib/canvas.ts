import {
    BUFFER_FRAMES,
    THUMBNAILS_SHEET_WIDTH,
    THUMBNAIL_FRAMES_MAX_COUNT,
    THUMBNAIL_FRAMES_PER_AXIS,
    THUMBNAIL_WIDTH,
} from '../helpers/constants';
import domELs from '../helpers/domEls';

const videoEl = domELs.videoEl;
const immersiveEl = domELs.immersiveEl;
const thumbnailsImage = domELs.thumbnailsImage;
const getAllCanvas = domELs.getAllCanvas;

export const updateCanvas = (seconds: number) => {
    // if (seconds % BUFFER_FRAMES !== 0) return;

    const { x, y } = getFrameCoords(
        videoEl.clientHeight,
        videoEl.clientWidth,
        seconds + BUFFER_FRAMES,
    );

    const canvas = setCanvasAttrs(document.createElement('canvas'));
    immersiveEl.appendChild(canvas);
    draw(canvas, x, y);

    const canvasList = getAllCanvas();
    if (canvasList.length > 2) {
        canvasList.item(0).remove();
    }
};

const setCanvasAttrs = (canvas: HTMLCanvasElement) => {
    const ratio = THUMBNAILS_SHEET_WIDTH / videoEl.clientWidth;
    const width = THUMBNAILS_SHEET_WIDTH / THUMBNAIL_FRAMES_PER_AXIS;
    const height = (videoEl.clientHeight * ratio) / THUMBNAIL_FRAMES_PER_AXIS;

    canvas.height = height;
    canvas.width = width;

    return canvas;
};

const getFrameCoords = (height: number, width: number, second: number) => {
    const ratio = THUMBNAILS_SHEET_WIDTH / width;
    // We have 100 images per thumbnails sheet so we roll over the counter from 100 to 0.
    const frameIndex =
        (Math.floor(second / BUFFER_FRAMES) * BUFFER_FRAMES) % THUMBNAIL_FRAMES_MAX_COUNT;

    const x = (frameIndex % THUMBNAIL_FRAMES_PER_AXIS) * THUMBNAIL_WIDTH;
    const y =
        Math.floor((frameIndex * THUMBNAIL_WIDTH) / THUMBNAILS_SHEET_WIDTH) *
        ((height * ratio) / THUMBNAIL_FRAMES_PER_AXIS);

    return { x, y };
};

const draw = (canvas: HTMLCanvasElement, x: number, y: number) => {
    canvas
        .getContext('2d')!
        .drawImage(
            thumbnailsImage,
            x,
            y,
            canvas.width,
            canvas.height,
            0,
            0,
            canvas.width,
            canvas.height,
        );
};
