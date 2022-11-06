import { videos } from '../data/videos';
import { BUFFER_FRAMES, LOADING_DELAY } from '../helpers/constants';
import dom from '../helpers/dom';
import { ArrayElement } from '../types';

const cssRoot = document.querySelector<HTMLHtmlElement>(':root')!;

export const loadVideo = async (
    video: ArrayElement<typeof videos>,
    videoEl: HTMLVideoElement,
    onTick: (seconds: number) => void,
) => {
    setVideoSrc(videoEl, `${video.path}/${video.filename}`, video.hash);
    onVideoTick(videoEl, onTick);
    cssRoot.style.setProperty('--frames-buffer', `${BUFFER_FRAMES}s`);

    // shhh
    return new Promise(resolve => setTimeout(resolve, LOADING_DELAY));
};

export const getVideoSize = (videoEl: HTMLVideoElement) => ({
    height: videoEl.clientHeight,
    width: videoEl.clientWidth,
});

export const playVideo = (videoEl: HTMLVideoElement) => videoEl.play();
export const stopVideo = (videoEl: HTMLVideoElement) => {
    videoEl.pause();
    videoEl.currentTime = 0;
    videoEl.removeEventListener('timeupdate', tickListener);
};

const setVideoSrc = (videoEl: HTMLVideoElement, src: string, hash: string) => {
    videoEl.src = src;
    videoEl.dataset.hash = hash;
};

let currTime = 0;
const tickListener = (_: Event) => (tick: (seconds: number) => void) => {
    const newValue = Math.floor(dom.videoEl.currentTime);
    if (currTime !== newValue) {
        currTime = newValue;
        tick(currTime);
    }
};

const onVideoTick = (videoEl: HTMLVideoElement, tick: (seconds: number) => void) => {
    currTime = 0;
    videoEl.addEventListener('timeupdate', e => tickListener(e)(tick));
};
