"use strict";

window.placePhotosToPictures = function (photos, pictures, template) {
  for (let i = 0; i < photos.length; i++) {
    const picture = template.cloneNode(true);
    const photoDataItem = photos[i];
    picture.querySelector(".picture__img").src = photoDataItem.url;
    picture.querySelector(".picture__likes").textContent = photoDataItem.likes;
    picture.querySelector(".picture__comments").textContent = photoDataItem.comments.length;
    pictures.appendChild(picture);
  }
};

window.placeDataToBigPhoto = function (photoData, bigPhotoElem) {

  // Добавить фото и описание
  bigPhotoElem.querySelector(".big-picture__img img").src = photoData.url;
  const bigPictureSocial = bigPhotoElem.querySelector(".big-picture__social");
  bigPictureSocial.querySelector(".likes-count").textContent = photoData.likes;
  bigPictureSocial.querySelector(".social__caption").textContent = photoData.description;
  bigPictureSocial.querySelector(".comments-count").textContent = photoData.comments.length;

  // Удалить все коменты
  const socialComments = bigPictureSocial.querySelector(".social__comments");
  const socialComment = bigPictureSocial.querySelector(".social__comment");
  const socialCommentChildList = socialComments.children;
  for (let i = 0; i < socialCommentChildList.length;) {
    socialComments.removeChild(socialCommentChildList[i]);
  }

  // Добавить коменты
  for (let i = 0; i < photoData.comments.length; i++) {
    socialComment.querySelector(".social__picture").src = photoData.comments[i].avatar;
    socialComment.querySelector(".social__picture").alt = photoData.comments[i].name;
    socialComment.querySelector(".social__text").textContent = photoData.comments[i].message;
    socialComments.appendChild(socialComment.cloneNode(true));
  }
};

window.showBigPhoto = function (photoNumber) {
  // document.querySelector("body").classList.add("modal-open");
  // window.bigPicture.classList.remove("hidden");
  window.placeDataToBigPhoto(photoNumber, window.bigPicture);
  document.querySelector(".social__comment-count").classList.add("hidden");
  document.querySelector(".comments-loader").classList.add("hidden");
};

// Загрузка фотографии, открытие формы для редактирования
const uploadPhotoForm = document.querySelector("#upload-select-image");
const editPhotoForm = uploadPhotoForm.querySelector(".img-upload__overlay");
const uploadPhotoButton = uploadPhotoForm.querySelector("#upload-file");
const closeEditPhotoFormButton = uploadPhotoForm.querySelector(".img-upload__cancel");
const photoPreview = editPhotoForm.querySelector(".img-upload__preview img");

// Удаление класса с фильтром
const removeFilter = function () {
  for (let i = 0; i < photoPreview.classList.length; i++) {
    const filterName = photoPreview.classList[i];
    if (filterName.startsWith("effects__preview--")) {
      photoPreview.classList.remove(filterName);
    }
  }
};

// Выбор фильтра
const photoFilterChangeHandler = function (evt) {
  if (evt.target && evt.target.matches(".effects__radio")) {
    removeFilter();
    photoPreview.classList.add("effects__preview--" + evt.target.value);
  }
};

uploadPhotoForm.addEventListener("change", photoFilterChangeHandler);


const inEditPhotoFormEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeEditPhotoForm();
  }
};

const openEditPhotoForm = function () {
  editPhotoForm.classList.remove("hidden");
  window.body.classList.add("modal-open");
  window.addEventListener("keydown", inEditPhotoFormEscPress);
};
const closeEditPhotoForm = function () {
  editPhotoForm.classList.add("hidden");
  window.body.classList.remove("modal-open");
  window.removeEventListener("keydown", inEditPhotoFormEscPress);
  removeFilter();
};

uploadPhotoButton.addEventListener("change", function (evt) {
  evt.preventDefault();
  openEditPhotoForm();
});

closeEditPhotoFormButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  closeEditPhotoForm();
});
