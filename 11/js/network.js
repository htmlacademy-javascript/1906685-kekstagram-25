const getData = (onSuccess, onError) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram/data'
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((thumbnails) => {
      onSuccess(thumbnails);
    })
    .catch((err) => {
      onError(err);
    });
};

const sendData = (onSuccess, onError, formData) => {
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
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};
export {getData, sendData};
