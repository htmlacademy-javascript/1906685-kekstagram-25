const pristine = new Pristine(imageUploadForm, {
  classTo: 'setup-upload-form__element',
  errorTextParent: 'setup-upload-form__element',
  errorTextClass: 'setup-upload-form__error-text',
});

const hashtagPattern =  /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const hashtagInputValue = hashtagInput.value;
const hashArray = hashtagInputValue.split(' ');
const validateSymbols = () =>
  hashArray.length < 5
  // for (let i = 0; i < hashArray.length; i++) {
  //   return hashtagPattern.test(hashArray[i]);
  // }
  ;
const validateSymbolsError = () => {
  'Неправильный хэштег';
};
pristine.addValidator(hashtagInput, validateSymbols, validateSymbolsError);
// function validateHashtag (value) {
//   return value.length >= 2 && value.length <= 50;
// }

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
  // const isValid = pristine.validate();
  // if (isValid) {
  //   // console.log('Можно отправлять');
  // } else {
  //   // console.log('Форма невалидна');
  // }
});
// +++++++++++++++++++++++;


// const userFormControler = () => {
//   const hashTagInputChangeHandler = (evt) => {
//     const hashtagPattern =  /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
//     const hashtagInputValue = evt.target.value;
//     const hashArray = hashtagInputValue.split(' ');
//     let counter = 0;
//     for (let i = 0; i < hashArray.length; i++) {
//       if (!hashtagPattern.test(hashArray[i])) {
//         evt.target.setCustomValidity('Неправильный хэштег');
//         break;
//       }
//       if (hashArray.length > 5) {
//         evt.target.setCustomValidity('Слишком много хэштегов');
//         break;
//       }
//       for (let j = 0; j < hashArray.length; j++) {
//         if(hashArray[i].toLowerCase() === hashArray[j].toLowerCase()){
//           counter++;
//         }
//       }

//       if (counter > hashArray.length) {
//         evt.target.setCustomValidity('Повторяться нельзя');
//         break;
//       }

//       evt.target.setCustomValidity('');

//       evt.target.reportValidity();
//     }
//   };
//   hashtagInput.addEventListener('input', hashTagInputChangeHandler);

//   imageUploadForm.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     evt.target.checkValidity();
//   });
// };
