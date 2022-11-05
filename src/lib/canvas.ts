import {
    BUFFER_FRAMES,
    THUMBNAILS_SHEET_WIDTH,
    THUMBNAIL_FRAMES_MAX_COUNT,
    THUMBNAIL_FRAMES_PER_AXIS,
    THUMBNAIL_WIDTH,
} from '../helpers/constants';

const getAllCanvas = () => document.querySelectorAll('.immersive canvas')!;

export const updateCanvas = ({
    immersiveContainerEl,
    videoEl,
    thumbnailsImage,
    seconds,
}: {
    immersiveContainerEl: Element;
    videoEl: HTMLVideoElement;
    thumbnailsImage: HTMLImageElement;
    seconds: number;
}) => {
    console.log(seconds);
    if (seconds % BUFFER_FRAMES !== 0) return;

    const { x, y } = getFrameCoords(
        videoEl.clientHeight,
        videoEl.clientWidth,
        seconds + BUFFER_FRAMES,
    );

    const canvas = setCanvasAttrs(
        videoEl.clientHeight,
        videoEl.clientWidth,
    )(document.createElement('canvas'));

    immersiveContainerEl.appendChild(canvas);
    draw(canvas, thumbnailsImage, x, y);

    const canvasList = getAllCanvas();
    if (canvasList.length > 2) {
        canvasList.item(0).remove();
    }
};

const setCanvasAttrs = (height: number, width: number) => (canvas: HTMLCanvasElement) => {
    const ratio = THUMBNAILS_SHEET_WIDTH / width;
    canvas.width = THUMBNAILS_SHEET_WIDTH / THUMBNAIL_FRAMES_PER_AXIS;
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

    return { x, y };
};

const draw = (canvas: HTMLCanvasElement, image: HTMLImageElement, x: number, y: number) => {
    canvas
        .getContext('2d')!
        .drawImage(image, x, y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
};
