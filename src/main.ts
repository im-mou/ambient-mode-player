import dom from './helpers/dom';
import { videos } from './data/videos';
import { loadVideo, getVideoSize, playVideo, stopVideo } from './lib/video';
import { loadCanvas, onUpdateCanvas, resetCanvas } from './lib/canvas';
import { loadThumbnailsImage, updateThumbnailsImage } from './lib/thumbnails';
import { setupUI } from './lib/ui';
import { ArrayElement } from './types';

import './style.css';

let selectedVideo = videos[0];

const onVideoTick = (seconds: number) => {
    onUpdateCanvas(dom.immersiveEl, dom.thumbnailsImage, seconds, getVideoSize(dom.videoEl));
    updateThumbnailsImage(selectedVideo, dom.videoEl, dom.thumbnailsImage, seconds);
};

const setupImmersivePlayer = async (video: ArrayElement<typeof videos>) => {
    selectedVideo = video;
    stopVideo(dom.videoEl);
    resetCanvas(dom.immersiveEl);
    await loadVideo(selectedVideo, dom.videoEl, onVideoTick);
    await playVideo(dom.videoEl);
    await loadThumbnailsImage(dom.videoEl, dom.thumbnailsImage, 1);
    loadCanvas(dom.immersiveEl, dom.thumbnailsImage, getVideoSize(dom.videoEl));
};

setupImmersivePlayer(videos[0]);
setupUI(videos, setupImmersivePlayer);
