'use strict';

const LOAD_URL = `https://21.javascript.pages.academy/kekstagram/data`;
const body = document.querySelector(`body`);
const uploadPhotoButton = document.querySelector(`#upload-file`);
const errorBanner = document.querySelector(`.error-banner`);
let photoGallery = [];

const showGallery = (photosArray) => {
  photoGallery = photosArray.slice();
  window.gallery.render(photoGallery);
};

window.backend.request({
  onSuccess: (allPhotosData) => {
    photoGallery = allPhotosData;
    showGallery(allPhotosData);

    window.filters.init(showGallery, photoGallery);
  },

  onError: (error) => {
    errorBanner.style.display = `block`;
    errorBanner.textContent = error;
  },
  url: LOAD_URL,
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
