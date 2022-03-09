import {getRandomIntInclusive, getRandomArrayElement} from './util.js';

const DESCRIPTIONS = [
  'on vacation',
  'swimming',
  'working',
  'washing dishes',
  'voting',
  'digging graves',
  'making cocktails',
  'doing math',
  'playing fiddle',
  'coding',
  'saving lives',
  'shopping',
  'killing time',
  'in a swimming pool',
  'at home',
  'playing videogames',
  'skiiing',
  'doing my chores',
  'building house',
  'working on my project',
  'crying',
  'walking my dog',
  'brushing teeth',
  'watcing TV',
  'playing my guitar',
  'sleeping',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
  'Петя',
  'Вася',
  'Коля',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

/**
 * Создаёт случайно сгенерированный комментарий
 * @returns возвращает случайный комментарий
 */
const createComment = () => ({
  id: getRandomIntInclusive(1, 999),
  avatar: `img/avatar-${getRandomIntInclusive(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

/**
 * Создаёт комментарии
 * @param {number} comentsCounter требуемое количество комментариев
 * @returns возвращает заданное количество комментариев
 */
const createComments = (comentsCounter) => {
  const commentsData = [];
  for (let j = 1; j <= comentsCounter; j++) {
    commentsData.push(createComment());
  }
  return commentsData;
};


/**
 * Создаёт пост
 * @param {number} i текуший элемент массива
 * @returns пост
 */
const createPostData = (i) => ({
  id: i,
  url: `photos/${i}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomIntInclusive(15, 200),
  comments: createComments(getRandomIntInclusive(15, 200)),
});



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


export {createPosts};
