const bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

/**
 *Отображает комментарии
 * @param {object} commentsData Случайный комментарий
 */
const renderComments = (commentsData) => {
  const commentBox = document.createElement('li');
  commentBox.classList.add('social__comment');
  const commenter = document.createElement('img');
  commenter.classList.add('social__picture');
  commenter.src = commentsData.comments.avatar;
  commenter.alt = commentsData.comments.name;
  commenter.width = 35;
  commenter.height = 35;
  commentBox.append(commenter);
  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = commentsData.comments.message;
};


/**
 *Отрисовывает большую картинку из поста
 * @param {object} photoData пост
 */
const renderFullPhoto  = (photoData) => {
  const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
  bigPictureImg.src = photoData.url;

  const likesCount = bigPicture.querySelector('.likes-count');
  likesCount.textContent = photoData.likes;

  const commentCount = bigPicture.querySelector('.comments-count');
  commentCount.textContent = photoData.comments.length;

  const commentsContainer = document.querySelector('.social__comments');
  commentsContainer.append(renderComments(photoData));

  const socialCaption = bigPicture.querySelector('.social__caption');
  socialCaption.textContent = photoData.description;
};


const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');
socialCommentCount.classList.add('hidden');
commentLoader.classList.add('hidden');
const docBody = document.querySelector('body');
docBody.classList.add('modal-open');

const closeButton = bigPicture.querySelector('.big-picture__cancel');
closeButton.addEventListener('click', () => {bigPicture.classList.add('hidden');});

closeButton.addEventListener('keypress', (e) => {
  if(e.keyCode === 27) {bigPicture.classList.add('hidden');}
});


export{renderFullPhoto};
