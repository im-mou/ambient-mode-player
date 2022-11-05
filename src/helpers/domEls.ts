// dom elements
const cssRoot = document.querySelector<HTMLHtmlElement>(':root')!;
const videoEl = document.querySelector<HTMLVideoElement>('.cinematics video')!;
const immersiveEl = document.querySelector('.immersive')!;
const getAllCanvas = () => document.querySelectorAll('.immersive canvas')!;
const cinematicsTitleEl = document.querySelector<HTMLHeadingElement>('.player__info .title')!;
const cinematicsSubtitleEl = document.querySelector<HTMLHeadingElement>('.player__info .subtitle')!;
const thumbnailsImage = new Image();

const domEL = {
    videoEl,
    immersiveEl,
    getAllCanvas,
    thumbnailsImage,
    cssRoot,
    cinematicsTitleEl,
    cinematicsSubtitleEl,
};

export default domEL;
