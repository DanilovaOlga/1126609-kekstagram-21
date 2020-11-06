'use strict';

(function () {

  const body = document.querySelector(`body`);
  const uploadPhotoButton = document.querySelector(`#upload-file`);
  const errorBanner = document.querySelector(`.error-banner`);

  const showGallery = (photosArray) => {
    const photoGallery = photosArray.slice();
    window.gallery.render(photoGallery);
  };

  window.backend.request({
    onSuccess: (allPhotosData) => {
      showGallery(allPhotosData);
    },
    onError: (error) => {
      errorBanner.style.display = `block`;
      errorBanner.textContent = error;
    },
    url: `https://21.javascript.pages.academy/kekstagram/data`,
    method: `GET`,
  });

  uploadPhotoButton.addEventListener(`change`, (evt) => {
    evt.preventDefault();
    window.editForm.open();
  });

  window.main = {
    body: body,
    uploadPhotoButton: uploadPhotoButton,
  };
})();
