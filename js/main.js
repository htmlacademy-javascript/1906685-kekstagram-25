function getRandomIntInclusive(min, max) {
  if (min >= max || min < 0){
    return NaN;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomIntInclusive(50, 12);
// Взято от сюда(https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random)

const someLine = 'some line';

function isAlowableLength(line, maxLength) {
  return (line.length < maxLength);
}
isAlowableLength(someLine, 256);
