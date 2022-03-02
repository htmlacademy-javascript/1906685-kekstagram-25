import {createPostData} from './data.js';

/**
 * Создаёт массив постов
 * @param {number} количество постов
 */
const createPosts = (postCounter) => {
  const postsData = [];
  for (let i = 1; i <= postCounter; i++) {
    postsData.push(createPostData(i));
  }
  return postsData;
};
createPosts(25);
