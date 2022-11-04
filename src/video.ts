export const videoEl = document.querySelector<HTMLVideoElement>('.player video')!;

export const setVideoSrc = (src: string, hash: string) => {
    videoEl.src = src;
    videoEl.dataset.hash = hash;
};

export const getVideoTick = (tick: (timeer: number) => void) => {
    let currTime = 0;
    videoEl.addEventListener('timeupdate', () => {
        const newValue = Math.floor(videoEl.currentTime);
        if (currTime !== newValue) {
            currTime = newValue;
            tick(currTime);
        }
    });
};
