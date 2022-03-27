import {showAlert} from './util.js';
const imageUploadForm = document.querySelector('.img-upload__form');
const uploadButton = imageUploadForm.querySelector('.img-upload__input');
const uploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
// const selectedFile = imageUploadForm.querySelector('.img-upload__input').files[0];
const effectLevel = document.querySelector('.img-upload__effect-level');

const body = document.querySelector('body');
const previewCloseButton = uploadOverlay.querySelector('.img-upload__cancel');
const commentInput = uploadOverlay.querySelector('.text__description');
const hashtagInput = uploadOverlay.querySelector('.text__hashtags');
const imageUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
const sliderElement = document.querySelector('.effect-level__slider');
const scaleValue = document.querySelector('.scale__control--value');
const onPopupEscKeydown = (e) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    closeUserModal();
  }
};

// сделанно для поднятия функции
function closeUserModal () {
  uploadOverlay.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscKeydown);
}

uploadButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  effectLevel.classList.add('hidden');
  imageUploadPreview.style.transform = 'scale(1)';
  scaleValue.value = '100%';
  imageUploadPreview.style.filter = 'none';
  sliderElement.classList.add('hidden');
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);


  previewCloseButton.addEventListener('click', () => {
    closeUserModal();
  });

  commentInput.addEventListener('focus', () => {
    document.removeEventListener('keydown', onPopupEscKeydown);
  });
  commentInput.addEventListener('blur', () => {
    document.addEventListener('keydown', onPopupEscKeydown);
  });
  hashtagInput.addEventListener('focus', () => {
    document.removeEventListener('keydown', onPopupEscKeydown);
  });
  hashtagInput.addEventListener('blur', () => {
    document.addEventListener('keydown', onPopupEscKeydown);
  });
});

// const userFormControler = () => {
//   const hashTagInputChangeHandler = (evt) => {
//     const hashtagPattern =  /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
//     const hashtagInputValue = evt.target.value;
//     const hashArray = hashtagInputValue.split(' ');
//     let counter = 0;
//     for (let i = 0; i < hashArray.length; i++) {
//
//       }
//       if (hashArray.length > 5) {
//
//       }
// for (let j = 0; j < hashArray.length; j++) {
//   if(hashArray[i].toLowerCase() === hashArray[j].toLowerCase()){
//     counter++;
//   }
// }

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

const pristine = new Pristine(imageUploadForm, {
  classTo: 'setup-upload-form__element',
  errorTextParent: 'setup-upload-form__element',
  errorTextClass: 'setup-upload-form__error-text',
});

const hashtagPattern =  /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
// const hashtagInputValue = hashtagInput.value;
// const validateSymbols = () => {
// };
// const validateSymbolsError = () => {
//   'Неправильный хэштег';
// };
// pristine.addValidator(hashtagInput, validateHashtags, 'Неправильный хэштег');
// pristine.addValidator(hashtagInput, ad, 'Неправильнsrштег');

// for (let i = 0; i < hashArray.length; i++) {
//   if (!hashtagPattern.test(hashArray[i])) {
//     // break;
//     return false;
//   }else {return true;}
// }
const validateHashtagsQuantity = (value) => {
  const hashArray = value.split(' ');
  return hashArray.length < 6;
};
const validateHashtagsLength = (value) => {
  let counter = 0;
  const hashArray = value.split(' ');
  let hashSymbolTest;
  let hashRepeatTest;
  for (let i = 0; i < hashArray.length; i++) {
    hashSymbolTest =  hashtagPattern.test(hashArray[i]);
    for (let j = 0; j < hashArray.length; j++) {
      if(hashArray[i].toLowerCase() === hashArray[j].toLowerCase()){
        counter++;
      } else if (hashArray[i].toLowerCase().length < hashArray[j].toLowerCase().length)
      {counter--;
      }
    }
    hashRepeatTest = counter <= hashArray.length;
  }
  return hashSymbolTest && hashRepeatTest;
};
pristine.addValidator(hashtagInput, validateHashtagsQuantity, 'Слишком много хэштегов');
pristine.addValidator(hashtagInput, validateHashtagsLength, 'Неправильный хэштег');
const enableValidation = (onSuccess) => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // pristine.validate();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      fetch(
        'https://25.javascript.pages.academy/kekstagram',
        {
          method: 'POST',
          body: formData,
        },
      )
        .then((response) => {
          if (response.ok) {
            onSuccess();
          } else {
            showAlert('Не удалось отправить форму. Попробуйте ещё раз');
          }
        })
        .catch(() => {
          showAlert('Не удалось отправить форму. Попробуйте ещё раз');
        });
    }
  });
};

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');

scaleSmaller.addEventListener('click', () => {
  if (parseInt(scaleValue.value, 10) > 25) {
    scaleValue.value = `${parseInt(scaleValue.value, 10) - 25}%`;
    imageUploadPreview.style.transform = `scale(${  parseInt(scaleValue.value, 10) / 100  })`;
  }
});

scaleBigger.addEventListener('click', () => {
  if (parseInt(scaleValue.value, 10) < 100) {
    scaleValue.value = `${parseInt(scaleValue.value, 10) + 25}%`;
    imageUploadPreview.style.transform = `scale(${  parseInt(scaleValue.value, 10) / 100  })`;
  }
});


const effectSliderValue = document.querySelector('.effect-level__value');
const filterSettingsCollection = {
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};
const sliderController = (min, max, step) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', () => {
    effectSliderValue.value = sliderElement.noUiSlider.get();
    if (imageUploadPreview.classList.contains('effects__preview--chrome')) {
      imageUploadPreview.style.filter = `grayscale(${effectSliderValue.value})`;
    }
    if (imageUploadPreview.classList.contains('effects__preview--sepia')) {
      imageUploadPreview.style.filter = `sepia(${effectSliderValue.value})`;
    }
    if (imageUploadPreview.classList.contains('effects__preview--marvin')) {
      imageUploadPreview.style.filter = `invert(${effectSliderValue.value}%)`;
    }
    if (imageUploadPreview.classList.contains('effects__preview--phobos')) {
      imageUploadPreview.style.filter = `blur(${effectSliderValue.value}px)`;
    }
    if (imageUploadPreview.classList.contains('effects__preview--heat')) {
      imageUploadPreview.style.filter = `brightness(${effectSliderValue.value})`;
    }
  });
};
const  onFilterChange = (evt) => {
  effectLevel.classList.remove('hidden');
  if (evt.target.value === 'none') {
    effectLevel.classList.add('hidden');
    sliderElement.classList.add('hidden');
    imageUploadPreview.style.filter = 'none';
  } else {
    sliderElement.classList.remove('hidden');
    effectLevel.classList.remove('hidden');
  }
  imageUploadPreview.classList.remove(imageUploadPreview.classList[0]);
  imageUploadPreview.classList.add(`effects__preview--${evt.target.value}`);
  sliderElement.noUiSlider.updateOptions({
    range: {
      'min': filterSettingsCollection[evt.target.value].min,
      'max': filterSettingsCollection[evt.target.value].max,
    },
    step: filterSettingsCollection[evt.target.value].step,
    start: 100,
  });
};

imageUploadForm.addEventListener('change', onFilterChange);

export {sliderController, enableValidation, closeUserModal};
