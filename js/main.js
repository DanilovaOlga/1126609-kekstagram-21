'use strict';

(function () {

  const uploadPhotoButton = document.querySelector(`#upload-file`);
  const errorBanner = document.querySelector(`.error-banner`);
  const showGallery = (photosArray) => {
    const photoGallery = photosArray.slice();
    window.gallery.render(photoGallery);
    const pictures = document.querySelectorAll(`.picture`);
    pictures.forEach((elem, i) => elem.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      window.preview.show(photosArray[i]);
    }));
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
    body: document.querySelector(`body`),
  };
})();
