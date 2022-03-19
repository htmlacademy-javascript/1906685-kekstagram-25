import {windowCloser} from './util.js';
let fixCommentAmount = 5;
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
    commentBox.classList.add('hidden');
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
    commentBox.append(commentText);
    commentsContainer.append(commentBox);
  });
  const allComments = document.querySelectorAll('.social__comment');
  for (let i = 0; i < fixCommentAmount; i++) {
    allComments[i].classList.remove('hidden');
  }
  const loadMore = document.querySelector('.social__comments-loader');
  loadMore.addEventListener('click', () => {
    const shownCommentsAmount = document.querySelector('.shown-comments-amount');
    const COMMENTS_ADD_STEP = 5;
    if (Number(commentsData.length) - Number(shownCommentsAmount.textContent) < COMMENTS_ADD_STEP) {
      fixCommentAmount = Number(shownCommentsAmount.textContent) + (Number(commentsData.length) - Number(shownCommentsAmount.textContent));
      loadMore.setAttribute('disabled', 'disabled');
    } else {
      fixCommentAmount += 5;
    }
    shownCommentsAmount.textContent = fixCommentAmount;
    for (let j = 0; j < fixCommentAmount; j++) {
      allComments[j].classList.remove('hidden');
    }
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


  windowCloser(closeButton, bigPicture);


  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  const commentLoader = bigPicture.querySelector('.comments-loader');
  socialCommentCount.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  const docBody = document.querySelector('body');
  docBody.classList.add('modal-open');

};


export{renderFullPhoto};
