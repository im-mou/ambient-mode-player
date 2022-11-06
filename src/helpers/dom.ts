// dom elements
const cssRoot = document.querySelector<HTMLHtmlElement>(':root')!;
const videoEl = document.querySelector<HTMLVideoElement>('.cinematics video')!;
const immersiveEl = document.querySelector('.immersive')!;
const debugFramesEl = document.querySelector('.debug-frames')!;
const debugFramesImageEl = document.querySelector<HTMLImageElement>('.debug-thumbnails')!;
const thumbnailsImage = new Image();

const dom = {
    videoEl,
    cssRoot,
    immersiveEl,
    thumbnailsImage,
    debugFramesEl,
    debugFramesImageEl,
};

export default dom;
