"use strict";

// Загрузка фотографии, открытие формы для редактирования
window.uploadPhotoForm = document.querySelector(".img-upload__form");
const editPhotoForm = uploadPhotoForm.querySelector(".img-upload__overlay");
const uploadPhotoButton = uploadPhotoForm.querySelector("#upload-file");
const closeEditPhotoFormButton = uploadPhotoForm.querySelector(".img-upload__cancel");
const photoPreview = editPhotoForm.querySelector(".img-upload__preview img");

// Слайдер
const effectLevelSlider = uploadPhotoForm.querySelector(".img-upload__effect-level");
const effectLevelLine = effectLevelSlider.querySelector(".effect-level__line");
const effectLevelDepth = effectLevelSlider.querySelector(".effect-level__depth");
const effectLevelPin = effectLevelSlider.querySelector(".effect-level__pin");
const effectLevel = effectLevelSlider.querySelector(".effect-level__value");
let currentFilterName = "none";

// Удаление класса с фильтром
const removeFilter = function () {
  for (let i = 0; i < photoPreview.classList.length; i++) {
    const filterName = photoPreview.classList[i];
    if (filterName.startsWith("effects__preview--")) {
      photoPreview.classList.remove(filterName);
    }
  }
};

const setEffectLevel = function (level) {
  effectLevel.value = level;
};

// Установить фильтр
const setFilter = function (filterName) {
  currentFilterName = filterName;
  removeFilter();
  photoPreview.classList.add("effects__preview--" + filterName);
  if (filterName === "none") {
    effectLevelSlider.style.display = "none";
    photoPreview.style.filter = "";
  } else {
    effectLevelSlider.style.display = "block";
  }

  setEffectLevel(100);
  applyEffectLevel();
};

// Установить насыщенность
const applyEffectLevel = function () {
  if (currentFilterName === "chrome") {
    photoPreview.style.filter = "grayscale(" + (effectLevel.value / 100) + ")";
  } else if (currentFilterName === "sepia") {
    photoPreview.style.filter = "sepia(" + (effectLevel.value / 100) + ")";
  } else if (currentFilterName === "marvin") {
    photoPreview.style.filter = "invert(" + (effectLevel.value) + "%)";
  } else if (currentFilterName === "phobos") {
    photoPreview.style.filter = "blur(" + ((effectLevel.value * 3) / 100) + "px)";
  } else if (currentFilterName === "heat") {
    photoPreview.style.filter = "brightness(" + ((effectLevel.value * 3) / 100 + 1) + ")";
  }
};

effectLevelPin.addEventListener("mouseup", function () {
  const newEffectLevelValue = Math.round((effectLevelDepth.clientWidth / effectLevelLine.clientWidth) * 100);
  effectLevel.value = newEffectLevelValue.toString();
  applyEffectLevel();
});

// Обновить вид превьюшки по умолчанию

const photoPreviewDefaultSettings = function () {
  currentImageScaleValue = DEFAULT_IMAGE_SCALE_VALUE;
  imageScaleValue.value = DEFAULT_IMAGE_SCALE_VALUE + "%";
  photoPreview.style.transform = "scale(1)";
};

// Выбор фильтра
const photoFilterChangeHandler = function (evt) {
  if (evt.target && evt.target.matches(".effects__radio")) {
    photoPreviewDefaultSettings();
    setFilter(evt.target.value);
  }
};
uploadPhotoForm.addEventListener("change", photoFilterChangeHandler);

// Открыть/закрыть форму

const openEditPhotoForm = function () {
  editPhotoForm.classList.remove("hidden");
  window.body.classList.add("modal-open");
  window.addEventListener("keydown", inEditPhotoFormEscPress);
  setFilter("none");
  imageScaleValue.value = DEFAULT_IMAGE_SCALE_VALUE + "%";
};

const closeEditPhotoForm = function () {
  editPhotoForm.classList.add("hidden");
  window.body.classList.remove("modal-open");
  window.removeEventListener("keydown", inEditPhotoFormEscPress);
};

uploadPhotoButton.addEventListener("change", function (evt) {
  evt.preventDefault();
  openEditPhotoForm();
});

closeEditPhotoFormButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  closeEditPhotoForm();
});

const inEditPhotoFormEscPress = function (evt) {
  if (window.textHashtags === document.activeElement) {
    return;
  }

  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeEditPhotoForm();
  }
};

// Выбор размера изображения

const imageScale = document.querySelector(".img-upload__scale");
const zoomOutButton = imageScale.querySelector(".scale__control--smaller");
const zoomInButton = imageScale.querySelector(".scale__control--bigger");
const imageScaleValue = imageScale.querySelector(".scale__control--value");
const MAX_IMAGE_SCALE_VALUE = 100;
const MIN_IMAGE_SCALE_VALUE = 25;
const DEFAULT_IMAGE_SCALE_VALUE = 100;
const IMAGE_SCALE_STEP = 25;

let currentImageScaleValue = DEFAULT_IMAGE_SCALE_VALUE;

zoomOutButton.addEventListener("click", function (evt) {
  evt.preventDefault();

  if (MIN_IMAGE_SCALE_VALUE < currentImageScaleValue) {
    currentImageScaleValue -= IMAGE_SCALE_STEP;
    photoPreview.style.transform = "scale(" + currentImageScaleValue / 100 + ")";
    imageScaleValue.value = currentImageScaleValue + "%";
  }
});

zoomInButton.addEventListener("click", function (evt) {
  evt.preventDefault();

  if (currentImageScaleValue < MAX_IMAGE_SCALE_VALUE) {
    currentImageScaleValue += IMAGE_SCALE_STEP;
    photoPreview.style.transform = "scale(" + currentImageScaleValue / 100 + ")";
    imageScaleValue.value = currentImageScaleValue + "%";
  }
});

// Валидация хэштегов

window.textHashtags = window.uploadPhotoForm.querySelector(".text__hashtags");

window.textHashtags.addEventListener("input", function () {
  window.hashtagsString = textHashtags.value;
  window.hashtagsValidity.checkHashtagsValidity();
  textHashtags.setCustomValidity(window.errorMessage);
  textHashtags.reportValidity();
});
