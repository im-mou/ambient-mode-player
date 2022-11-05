import dom from './helpers/dom';
import { videos } from './data/videos';
import { loadVideo, getVideoSize, playVideo } from './lib/video';
import { loadCanvas, onUpdateCanvas } from './lib/canvas';
import { loadThumbnailsImage, updateThumbnailsImage } from './lib/thumbnails';
import { setupUI } from './lib/ui';
import { ArrayElement } from './types';

import './styles/select.css';
import './style.css';

window.immersive = window.immersive || {};

let selectedVideo: ArrayElement<typeof videos>;

const onVideoTick = (seconds: number) => {
    onUpdateCanvas(dom.immersiveEl, dom.thumbnailsImage, seconds, getVideoSize(dom.videoEl));
    updateThumbnailsImage(selectedVideo, dom.videoEl, dom.thumbnailsImage, seconds);
};

const setupImmersivePlayer = async (video: ArrayElement<typeof videos>) => {
    selectedVideo = video;
    await Promise.all([
        loadVideo(video, dom.videoEl, onVideoTick),
        loadThumbnailsImage(dom.videoEl, dom.thumbnailsImage, 1),
    ]);
    playVideo(dom.videoEl);
    loadCanvas(dom.immersiveEl, dom.thumbnailsImage, getVideoSize(dom.videoEl));
};

setupImmersivePlayer(videos[0]);
setupUI(videos, setupImmersivePlayer);
