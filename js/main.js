function getRandomIntInclusive(min, max) {
  if (min>=max){
    return console.log('Неверные значения');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomIntInclusive(50, 12);
// Взято от сюда(https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random)

const piss = [1, 3, 45, 643, 6];

function isAlowableLength(line, maxLength){
  if (line.length < maxLength) {
    return true;} else{
    return false;
  }
}
isAlowableLength(piss, 256);
