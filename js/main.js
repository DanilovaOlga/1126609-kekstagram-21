'use strict';

(function () {

  const body = document.querySelector(`body`);
  const uploadPhotoButton = document.querySelector(`#upload-file`);
  const errorBanner = document.querySelector(`.error-banner`);

  const showGallery = (photosArray) => {
    const photoGallery = photosArray.slice();
    window.gallery.render(photoGallery);
  };

  window.backend.load((allPhotosData) => {
    showGallery(allPhotosData);
  }, (error) => {
    errorBanner.style.display = `block`;
    errorBanner.textContent = error;
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
