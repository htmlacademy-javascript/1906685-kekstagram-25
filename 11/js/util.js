import {closeUserModal} from './user-form.js';

/**
 * Функция возвращает случайное число в заданном диапазоне
 * @param {number} min минимальное значение заданного диапазона
 * @param {number} max максимальное значение заданного диапазона
 * @returns {number}
 */
function getRandomIntInclusive(min, max) {
  if (min >= max || min < 0) {
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

/**
 * Функция для проверки максимальной длины строки
 * @param {string} line строка, длинну которой следует проверить
 * @param {number} maxLength максимальная допустимая длинна строки
 * @returns {boolean}
 */
function isAlowableLength(line, maxLength) {
  return (line.length <= maxLength);
}

/**
 * функция закрытия окон
 * @param {Element} closeButton Кнопка, закрывающая окно
 * @param {Element} window Окно, которое надо закрыть
 */
const windowCloser = (closeButton, window) => {
  const onPopupEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeWindow();
    }
  };
  document.addEventListener('keydown', onPopupEscKeydown);

  function closeWindow () {
    window.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscKeydown);
  }

  closeButton.addEventListener('click', () => {
    closeWindow();
  });
};


const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const showAlert = () => {
  const errorPopup = errorTemplate.cloneNode(true);
  closeUserModal();
  document.body.append(errorPopup);
  const tryAgainButton = errorPopup.querySelector('.error__button');
  tryAgainButton.addEventListener('click', () => {
    errorPopup.remove();
  });
};

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const showSuccess = () => {
  const successPopup = successTemplate.cloneNode(true);
  closeUserModal();
  document.body.append(successPopup);
  const coolButton = successPopup.querySelector('.success__button');
  coolButton.addEventListener('click', () => {
    successPopup.remove();
  });
};

export {getRandomIntInclusive, getRandomArrayElement, isAlowableLength, windowCloser, showAlert, showSuccess};
