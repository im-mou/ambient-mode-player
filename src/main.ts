import { loadVideo } from './lib/video';
import { videos } from './data/videos';
import { updateCanvas } from './lib/canvas';
import { loadThumbnailsImage, updateThumbnailsImage } from './lib/thumbnails';

import './styles/select.css';
import './style.css';
import { setupUI } from './lib/ui';
import { ArrayElement } from './types';
import domEL from './helpers/domEls';

var selectedVideo: ArrayElement<typeof videos>;

const setVideo = (video: ArrayElement<typeof videos>) => {
    selectedVideo = video;
    loadVideo({ video: selectedVideo, onTick: onVideoTick, videoEl: domEL.videoEl });
    loadThumbnailsImage(1);
};

const onVideoTick = (seconds: number) => {
    updateCanvas({
        seconds,
        videoEl: domEL.videoEl,
        thumbnailsImage: domEL.thumbnailsImage,
        immersiveContainerEl: domEL.immersiveEl,
    });
    updateThumbnailsImage(selectedVideo, seconds);
};

setupUI(videos, setVideo);
setVideo(videos[0]);
