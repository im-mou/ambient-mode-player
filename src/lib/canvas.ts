import {
    BUFFER_FRAMES,
    THUMBNAILS_SHEET_WIDTH,
    THUMBNAIL_FRAMES_MAX_COUNT,
    THUMBNAIL_FRAMES_PER_AXIS,
    THUMBNAIL_WIDTH,
} from '../helpers/constants';
import dom from '../helpers/dom';

const getAllCanvas = () => document.querySelectorAll('.immersive canvas')!;
const getAllDebugCanvas = () => document.querySelectorAll('.debug-frames canvas')!;

export const loadCanvas = (
    immersiveContainerEl: Element,
    thumbnailsImage: HTMLImageElement,
    size: { height: number; width: number },
) => {
    // First render
    const coords = getFrameCoords(size.height, size.width, 0);
    renderCanvas(immersiveContainerEl, thumbnailsImage, coords);
    // Second frame render
    const coordsNext = getFrameCoords(size.height, size.width, BUFFER_FRAMES);
    renderCanvas(immersiveContainerEl, thumbnailsImage, coordsNext);
};

export const onUpdateCanvas = (
    immersiveContainerEl: Element,
    thumbnailsImage: HTMLImageElement,
    seconds: number,
    size: { height: number; width: number },
) => {
    if (seconds % BUFFER_FRAMES !== 0) return;
    const coords = getFrameCoords(size.height, size.width, seconds + BUFFER_FRAMES);
    renderCanvas(immersiveContainerEl, thumbnailsImage, coords);
};

export const resetCanvas = (immersiveContainerEl: Element) => {
    immersiveContainerEl.innerHTML = '';
    dom.debugFramesEl.innerHTML = '';
};

const renderCanvas = (
    immersiveContainerEl: Element,
    thumbnailsImage: HTMLImageElement,
    coords: { x: number; y: number; h: number; w: number },
) => {
    const canvas = setCanvasAttrs(coords.h, coords.w)(document.createElement('canvas'));
    immersiveContainerEl.appendChild(canvas);
    draw(canvas, thumbnailsImage, coords.x, coords.y);
    const canvasList = getAllCanvas();
    if (canvasList.length > 2) canvasList.item(0).remove();

    // Frames debug view
    const canvasDebug = setCanvasAttrs(coords.h, coords.w)(document.createElement('canvas'));
    dom.debugFramesEl.appendChild(canvasDebug);
    draw(canvasDebug, thumbnailsImage, coords.x, coords.y);
    const debugCanvasList = getAllDebugCanvas();
    if (debugCanvasList.length > 2) debugCanvasList.item(0).remove();
};

const setCanvasAttrs = (height: number, width: number) => (canvas: HTMLCanvasElement) => {
    const ratio = THUMBNAILS_SHEET_WIDTH / width;
    canvas.width = THUMBNAIL_WIDTH;
    canvas.height = (height * ratio) / THUMBNAIL_FRAMES_PER_AXIS;
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

    return { x, y, h: height, w: width };
};

const draw = (canvas: HTMLCanvasElement, image: HTMLImageElement, x: number, y: number) => {
    canvas
        .getContext('2d')!
        .drawImage(image, x, y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
};
