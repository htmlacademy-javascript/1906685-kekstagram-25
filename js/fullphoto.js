import {createPosts} from './data.js';

const bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

createPosts()