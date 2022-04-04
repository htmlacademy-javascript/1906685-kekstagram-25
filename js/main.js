import {getData} from './network.js';
import {showSuccess} from './util.js';
import {renderThumbnails} from './thumbnails.js';
import {sliderController, enableValidation} from'./user-form.js';
const POST_COUNT = 19;

enableValidation(showSuccess);
getData((thumbnails) => {
  renderThumbnails(thumbnails.slice(0, POST_COUNT));
}, () => {

});
sliderController(0, 1, 0.1);
