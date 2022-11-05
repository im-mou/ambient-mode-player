import { videos } from '../data/videos';
import { THUMBNAIL_FRAMES_MAX_COUNT } from '../helpers/constants';
import { ArrayElement } from '../types';

export const loadThumbnailsImage = (
    videoEl: HTMLVideoElement,
    image: HTMLImageElement,
    sheet: number,
) => {
    image.src = `thumbnails/${videoEl.dataset.hash!}/${sheet}.jpg`;
    videoEl.dataset.sheet = sheet.toString();
};

export const updateThumbnailsImage = (
    video: ArrayElement<typeof videos>,
    videoEl: HTMLVideoElement,
    thumbnailsImage: HTMLImageElement,
    seconds: number,
) => {
    if (seconds < 1) return;
    if (video.thumbnail_sheets <= 1) return;

    const sheet = Math.ceil(seconds / THUMBNAIL_FRAMES_MAX_COUNT);
    if (parseInt(videoEl.dataset.sheet!) !== sheet) {
        loadThumbnailsImage(videoEl, thumbnailsImage, sheet);
    }
};
