import {createPosts} from './data.js';
import {renderThumbnails} from './thumbnails.js';
import {renderFullPhoto} from './fullphoto.js';
import {userFormControler, sliderController} from'./user-form.js';

const POST_COUNT = 12;

const similarPictures = createPosts(POST_COUNT);
renderThumbnails(similarPictures);
renderFullPhoto(similarPictures[0]);
userFormControler();
sliderController(0, 1, 0.1);
