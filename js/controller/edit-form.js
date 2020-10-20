"use strict";
(function () {

  // Загрузка фотографии, открытие формы для редактирования
  window.uploadPhotoForm = document.querySelector(".img-upload__form");
  const editPhotoForm = window.uploadPhotoForm.querySelector(".img-upload__overlay");
  const closeEditPhotoFormButton = window.uploadPhotoForm.querySelector(".img-upload__cancel");
  const photoPreview = editPhotoForm.querySelector(".img-upload__preview img");
  const effectLevel = document.querySelector(".effect-level__value");
  let currentFilterName = "none";

  // Обновить вид превьюшки по умолчанию
  const photoPreviewDefaultSettings = function () {
    currentImageScaleValue = DEFAULT_IMAGE_SCALE_VALUE;
    imageScaleValue.value = DEFAULT_IMAGE_SCALE_VALUE + "%";
    photoPreview.style.transform = "scale(1)";
  };

  // Установить фильтр
  const setFilter = function (filterName) {
    currentFilterName = filterName;
    removeFilter();
    photoPreview.classList.add("effects__preview--" + filterName);
    if (filterName === "none") {
      window.slider.hide();
    } else {
      window.slider.show();
    }

    setEffectLevel(100);
    applyEffectLevel(currentFilterName);
  };


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
    applyEffectLevel(currentFilterName);
  };

  // Установить насыщенность

  const applyEffectLevel = function (filterName) {
    const filter = {
      chrome: "grayscale(" + (effectLevel.value / 100) + ")",
      sepia: "sepia(" + (effectLevel.value / 100) + ")",
      marvin: "invert(" + (effectLevel.value) + "%)",
      phobos: "blur(" + ((effectLevel.value * 3) / 100) + "px)",
      heat: "brightness(" + ((effectLevel.value * 3) / 100 + 1) + ")",
      default: "",
    };

    photoPreview.style.filter = filter[filterName] || filter["default"];
  };


  // Выбор фильтра
  const photoFilterChangeHandler = function (evt) {
    if (evt.target && evt.target.matches(".effects__radio")) {
      photoPreviewDefaultSettings();
      setFilter(evt.target.value);
    }
  };
  window.uploadPhotoForm.addEventListener("change", photoFilterChangeHandler);

  window.slider.addEventListener("change", setEffectLevel);

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

    const errorMessage = window.hashtagsValidity.checkHashtagsValidity(window.textHashtags.value);
    window.textHashtags.setCustomValidity(errorMessage);
    window.textHashtags.reportValidity();
  });

  window.editForm = {
    open: openEditPhotoForm,
  };

})();
