import { videos } from '../data/videos';
import { THUMBNAIL_FRAMES_MAX_COUNT } from '../helpers/constants';
import domELs from '../helpers/domEls';
import { ArrayElement } from '../types';

const videoEl = domELs.videoEl;
const thumbnailsImage = domELs.thumbnailsImage;

export const loadThumbnailsImage = (sheet: number) => {
    thumbnailsImage.src = `thumbnails/${videoEl.dataset.hash!}/${sheet}.jpg`;
    videoEl.dataset.sheet = sheet.toString();
};

export const updateThumbnailsImage = (video: ArrayElement<typeof videos>, seconds: number) => {
    if (seconds < 1) return;
    if (video.thumbnail_sheets <= 1) return;

    const sheet = Math.ceil(seconds / THUMBNAIL_FRAMES_MAX_COUNT);
    if (parseInt(videoEl.dataset.sheet!) !== sheet) {
        loadThumbnailsImage(sheet);
    }
};
