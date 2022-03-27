import{createLoader} from './network.js';
// import {createPosts} from './data.js';
import {renderThumbnails} from './thumbnails.js';
import {renderFullPhoto} from './fullphoto.js';
import {sliderController, enableValidation, closeUserModal} from'./user-form.js';
const POST_COUNT = 19;

// fetch('https://25.javascript.pages.academy/kekstagram/data')
//   .then((response) => response.json())
//   .then((thumbnails) => {
//     renderThumbnails(thumbnails.slice(0, POST_COUNT));
//     renderFullPhoto(thumbnails[0]);
//   });

enableValidation(closeUserModal);
// const similarPictures = createPosts(POST_COUNT);
// renderThumbnails(similarPictures);
createLoader((thumbnails) => {
  renderThumbnails(thumbnails.slice(0, POST_COUNT));
  renderFullPhoto(thumbnails[0]);
}, () => {
  console.error('произошла ошибка');
});
// userFormControler();
sliderController(0, 1, 0.1);
