import './style.css';
import { setVideoSrc, getVideoTick } from './video';
import { videos } from './data/videos';
import { setThumbnailsImage, updateCanvas } from './canvas';

const selectedVideo = videos[1];

setVideoSrc(`${selectedVideo.path}/${selectedVideo.filename}`, selectedVideo.hash);

setThumbnailsImage(1);
getVideoTick(updateCanvas);