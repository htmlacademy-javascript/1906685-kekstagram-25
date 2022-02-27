/**
 * Функция возвращает случайное число в заданном диапазоне
 * @param {number} min минимальное значение заданного диапазона
 * @param {number} max максимальное значение заданного диапазона
 * @returns {number} 
 */
 function getRandomIntInclusive(min, max) {
  if (min >= max || min < 0){
    return NaN;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Взято от сюда(https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random)



const someLine = 'some line';
/**
 * Функция для проверки максимальной длины строки
 * @param {string} line строка, длинну которой следует проверить 
 * @param {number} maxLength максимальная допустимая длинна строки
 * @returns {boolean}
 */
function isAlowableLength(line, maxLength) {
  return (line.length <= maxLength);
}
isAlowableLength(someLine, 256);

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
 * Возвращает случайный элемент массива
 * @param {array} elements массив, случайный элемент которого следует вернуть
 * @returns {string} случайный элемент массива
 */
const getRandomArrayElement = (elements) => {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
};

/**
 * Создаёт случайно сгенерированный комментарий
 * @returns возвращает случайный комментарий
 */
const createComment = () => {
  return {
      id: getRandomIntInclusive(1, 999),
      avatar: `img/avatar-${getRandomIntInclusive(1, 6)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES),
    }
}
const createComments = Array.from({length: 7}, createComment);

/**
 * Создаёт пост
 * @param {number} i текуший элемент массива 
 * @returns пост
 */
const createPostData = (i) => {
  return {
    id: i,
    url: `photos/${i}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomIntInclusive(15, 200),
    comments: createComments,
  };
};

/**
 * Создаёт массив постов
 */
createPosts = () => {
  let postsData = [];
  for (let i = 1; i <= 25; i++) {
  postsData.push(createPostData(i));
  }
  return postsData;
}
createPosts()