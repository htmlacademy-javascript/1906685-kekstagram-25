import {showAlert} from './util.js';
import {sendData} from './network.js';
const imageUploadForm = document.querySelector('.img-upload__form');
const uploadInput = imageUploadForm.querySelector('.img-upload__input');
const uploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
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

uploadInput.addEventListener('change', (evt) => {
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


const pristine = new Pristine(imageUploadForm, {
  classTo: 'setup-upload-form__element',
  errorTextParent: 'setup-upload-form__element',
  errorTextClass: 'setup-upload-form__error-text',
});

const hashtagPattern =  /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const HASHTAG_LIMIT = 5;
const validateHashtagsQuantity = (value) => {
  const hashArray = value.split(' ');
  return hashArray.length <= HASHTAG_LIMIT;
};
const validateHashtagsLength = (value) => {
  const hashArray = value.split(' ');
  for (let i = 0; i < hashArray.length; i++) {

    if (!hashtagPattern.test(hashArray[i])) {
      return false;
    }
    for (let j = i + 1; j < hashArray.length; j++) {
      if(hashArray[i].toLowerCase() === hashArray[j].toLowerCase()){
        return false;
      }
    }
  }
  return true;
};

pristine.addValidator(hashtagInput, validateHashtagsQuantity, 'Слишком много хэштегов');
pristine.addValidator(hashtagInput, validateHashtagsLength, 'Неправильный хэштег');
const enableValidation = (onSuccess) => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      sendData(onSuccess, showAlert, formData);
    }
  });
};

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');

const MIN_PERCENTAGE = 25;
const MAX_PERCENTAGE = 100;
scaleSmaller.addEventListener('click', () => {
  if (parseInt(scaleValue.value, 10) > MIN_PERCENTAGE) {
    scaleValue.value = `${parseInt(scaleValue.value, 10) - MIN_PERCENTAGE}%`;
    imageUploadPreview.style.transform = `scale(${  parseInt(scaleValue.value, 10) / MAX_PERCENTAGE  })`;
  }
});

scaleBigger.addEventListener('click', () => {
  if (parseInt(scaleValue.value, 10) < MAX_PERCENTAGE) {
    scaleValue.value = `${parseInt(scaleValue.value, 10) + MIN_PERCENTAGE}%`;
    imageUploadPreview.style.transform = `scale(${  parseInt(scaleValue.value, 10) / MAX_PERCENTAGE  })`;
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
