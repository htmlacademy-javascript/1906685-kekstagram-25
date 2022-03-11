const thumbnails = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

/**
 *Отрисовывает миниатюры
 * @param {Array} thumbnailData Массив объектов, описывающих миниатюры
 */
const renderThumbnails = (thumbnailData) => {

  const similarListFragment = document.createDocumentFragment();

  thumbnailData.forEach(({url, likes, comments}) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    thumbnailElement.querySelector('.picture__img').src = url;
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.message;
    similarListFragment.appendChild(thumbnailElement);
  });

  thumbnails.appendChild(similarListFragment);
};

export {renderThumbnails};
