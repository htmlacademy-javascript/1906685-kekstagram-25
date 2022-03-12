import {createPosts} from './data.js';
import {renderThumbnails} from './thumbnails.js';
import {renderFullPhoto} from './fullphoto.js';

const POST_COUNT = 6;

const similarPictures = createPosts(POST_COUNT);
renderThumbnails(similarPictures);
renderFullPhoto(similarPictures[0]);
