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

/**
 * Возвращает случайный элемент массива
 * @param {array} elements массив, случайный элемент которого следует вернуть
 * @returns {string} случайный элемент массива
 */
const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

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

export {getRandomIntInclusive, getRandomArrayElement, isAlowableLength};