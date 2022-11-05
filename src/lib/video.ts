import { videos } from '../data/videos';
import { BUFFER_FRAMES } from '../helpers/constants';
import { ArrayElement } from '../types';

const cssRoot = document.querySelector<HTMLHtmlElement>(':root')!;

export const loadVideo = ({
    video,
    videoEl,
    onTick,
}: {
    video: ArrayElement<typeof videos>;
    videoEl: HTMLVideoElement;
    onTick: (seconds: number) => void;
}) => {
    setVideoSrc(videoEl, `${video.path}/${video.filename}`, video.hash);
    onVideoTick(videoEl, onTick);
    cssRoot.style.setProperty('--frames-buffer', `${BUFFER_FRAMES}s`);
};

const setVideoSrc = (videoEl: HTMLVideoElement, src: string, hash: string) => {
    videoEl.src = src;
    videoEl.dataset.hash = hash;
};

const onVideoTick = (videoEl: HTMLVideoElement, tick: (seconds: number) => void) => {
    let currTime = 0;
    videoEl.addEventListener('timeupdate', () => {
        const newValue = Math.floor(videoEl.currentTime);
        if (currTime !== newValue) {
            currTime = newValue;
            tick(currTime);
        }
    });
};
