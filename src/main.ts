import { loadVideo, getVideoSize } from './lib/video';
import { videos } from './data/videos';
import { loadCanvas, onUpdateCanvas } from './lib/canvas';
import { loadThumbnailsImage, updateThumbnailsImage } from './lib/thumbnails';

import './styles/select.css';
import './style.css';
import { setupUI } from './lib/ui';
import { ArrayElement } from './types';
import dom from './helpers/dom';

let selectedVideo: ArrayElement<typeof videos>;

const onVideoTick = (seconds: number) => {
    onUpdateCanvas(dom.immersiveEl, dom.thumbnailsImage, seconds, getVideoSize(dom.videoEl));
    updateThumbnailsImage(selectedVideo, dom.videoEl, dom.thumbnailsImage, seconds);
};

const setupImmersivePlayer = (video: ArrayElement<typeof videos>) => {
    selectedVideo = video;
    loadVideo(video, dom.videoEl, onVideoTick);
    loadThumbnailsImage(dom.videoEl, dom.thumbnailsImage, 1);
    loadCanvas(dom.immersiveEl, dom.thumbnailsImage, getVideoSize(dom.videoEl));
};

setupImmersivePlayer(videos[0]);
setupUI(videos, setupImmersivePlayer);
