import { videos } from '../data/videos';
import { BUFFER_FRAMES } from '../helpers/constants';
import domELs from '../helpers/domEls';
import { ArrayElement } from '../types';

const videoEl = domELs.videoEl;

export const loadVideo = (
    video: ArrayElement<typeof videos>,
    onTick: (seconds: number) => void,
) => {
    setVideoSrc(`${video.path}/${video.filename}`, video.hash);
    onVideoTick(onTick);
    domELs.cssRoot.style.setProperty('--frames-buffer', `${BUFFER_FRAMES}s`);
};

const setVideoSrc = (src: string, hash: string) => {
    videoEl.src = src;
    videoEl.dataset.hash = hash;
};

const onVideoTick = (tick: (seconds: number) => void) => {
    let currTime = 0;
    videoEl.addEventListener('timeupdate', () => {
        const newValue = Math.floor(videoEl.currentTime);
        if (currTime !== newValue) {
            currTime = newValue;
            tick(currTime);
        }
    });
};
