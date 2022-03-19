const imageUploadForm = document.querySelector('.img-upload__form');
const uploadButton = imageUploadForm.querySelector('.img-upload__input');
const uploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
// const selectedFile = imageUploadForm.querySelector('.img-upload__input').files[0];
const body = document.querySelector('body');
// const uplPreview = imageUploadForm.querySelector('.img-upload__preview').querySelector('img');
const previewCloseButton = uploadOverlay.querySelector('.img-upload__cancel');
const commentInput = uploadOverlay.querySelector('.text__description');
const hashtagInput = uploadOverlay.querySelector('.text__hashtags');
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
  //   uplPreview.src = selectedFile;
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

const userFormControler = () => {
  const hashTagInputChangeHandler = (evt) => {
    const hashtagPattern =  /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
    const hashtagInputValue = evt.target.value;
    const hashArray = hashtagInputValue.split(' ');
    let counter = 0;
    for (let i = 0; i < hashArray.length; i++) {
      if (!hashtagPattern.test(hashArray[i])) {
        evt.target.setCustomValidity('Неправильный хэштег');
        break;
      }
      if (hashArray.length > 5) {
        evt.target.setCustomValidity('Слишком много хэштегов');
        break;
      }
      for (let j = 0; j < hashArray.length; j++) {
        if(hashArray[i].toLowerCase() === hashArray[j].toLowerCase()){
          counter++;
        }
      }

      if (counter > hashArray.length) {
        evt.target.setCustomValidity('Повторяться нельзя');
        break;
      }

      evt.target.setCustomValidity('');

      evt.target.reportValidity();
    }
  };
  hashtagInput.addEventListener('input', hashTagInputChangeHandler);

  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    evt.target.checkValidity();
  });
};

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');

scaleSmaller.addEventListener('click', () => {
  if (scaleValue.value === '100%') {
    scaleValue.value = '75%';
    imageUploadPreview.style.transform = 'scale(0.75)';
  } else if (scaleValue.value === '75%') {
    scaleValue.value = '50%';
    imageUploadPreview.style.transform = 'scale(0.50)';
  } else if (scaleValue.value === '50%') {
    scaleValue.value = '25%';
    imageUploadPreview.style.transform = 'scale(0.25)';
  }
});
scaleBigger.addEventListener('click', () => {
  if (scaleValue.value === '25%') {
    scaleValue.value = '50%';
    imageUploadPreview.style.transform = 'scale(0.50)';
  } else if (scaleValue.value === '50%') {
    scaleValue.value = '75%';
    imageUploadPreview.style.transform = 'scale(0.75)';
  }else if (scaleValue.value === '75%') {
    scaleValue.value = '100%';
    imageUploadPreview.style.transform = 'scale(1.00)';
  }
});

// const effectSelector = document.querySelectorAll('.effects__radio');

const  onFilterChange = (evt) => {
  imageUploadPreview.classList.remove(imageUploadPreview.classList[0]);
  imageUploadPreview.classList.add(`effects__preview--${evt.target.value}`);
};

imageUploadForm.addEventListener('change', onFilterChange);

export{userFormControler};
