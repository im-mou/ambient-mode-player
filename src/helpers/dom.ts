// dom elements
const cssRoot = document.querySelector<HTMLHtmlElement>(':root')!;
const videoEl = document.querySelector<HTMLVideoElement>('.cinematics video')!;
const immersiveEl = document.querySelector('.immersive')!;
const thumbnailsImage = new Image();

const dom = {
    videoEl,
    immersiveEl,
    thumbnailsImage,
    cssRoot,
};

export default dom;
