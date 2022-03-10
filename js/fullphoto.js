/**
 *Отображает комментарии
 * @param {Array} commentsData Случайный комментарий
 */
const renderComments = (commentsData) => {
  const commentsContainer = document.querySelector('.social__comments');
  commentsContainer.innerHTML = '';
  commentsData.forEach((element) => {
    const commentBox = document.createElement('li');
    commentBox.classList.add('social__comment');
    const commenter = document.createElement('img');
    commenter.classList.add('social__picture');
    commenter.src = element.avatar;
    commenter.alt = element.name;
    commenter.width = 35;
    commenter.height = 35;
    commentBox.append(commenter);
    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = element.message;
  });

};


/**
 *Отрисовывает большую картинку из поста
 * @param {object} photoData пост
 */
const renderFullPhoto  = (photoData) => {
  const bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
  bigPictureImg.src = photoData.url;

  const likesCount = bigPicture.querySelector('.likes-count');
  likesCount.textContent = photoData.likes;

  const commentCount = bigPicture.querySelector('.comments-count');
  commentCount.textContent = photoData.comments.length;

  const commentsContainer = document.querySelector('.social__comments');
  commentsContainer.append(renderComments(photoData.comments));

  const socialCaption = bigPicture.querySelector('.social__caption');
  socialCaption.textContent = photoData.description;

  const closeButton = bigPicture.querySelector('.big-picture__cancel');
  closeButton.addEventListener('click', () => {bigPicture.classList.add('hidden');});

  document.addEventListener('keypress', (e) => {
    if (e.key === 'Esc') {
      bigPicture.classList.add('hidden');
    }
  });

  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  const commentLoader = bigPicture.querySelector('.comments-loader');
  socialCommentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  const docBody = document.querySelector('body');
  docBody.classList.add('modal-open');
};


export{renderFullPhoto};
