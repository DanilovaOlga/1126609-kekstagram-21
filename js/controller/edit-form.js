'use strict';
(function () {

  const Effect = {
    MAX: 100,
    MIN: 25,
    STEP: 25,
    BLUR_MAX: 3,
    BRIGHTNESS_MAX: 3,
    BRIGHTNESS_MIN: 1,
  };

  // Загрузка фотографии, открытие формы для редактирования
  const uploadPhotoForm = document.querySelector(`.img-upload__form`);
  const editPhotoForm = uploadPhotoForm.querySelector(`.img-upload__overlay`);
  const closeEditPhotoFormButton = uploadPhotoForm.querySelector(`.img-upload__cancel`);
  const photoPreview = editPhotoForm.querySelector(`.img-upload__preview img`);
  const effectLevel = document.querySelector(`.effect-level__value`);
  const textHashtags = uploadPhotoForm.querySelector(`.text__hashtags`);
  let currentFilterName = `none`;

  // Обновить вид превьюшки по умолчанию
  const photoPreviewDefaultSettings = () => {
    currentImageScaleValue = Effect.MAX;
    imageScaleValue.value = `${Effect.MAX} %`;
    photoPreview.style.transform = `scale(1)`;
  };

  // Установить фильтр
  const setFilter = (filterName) => {
    currentFilterName = filterName;
    removeFilter();
    photoPreview.classList.add(`effects__preview--${filterName}`);
    if (filterName === `none`) {
      window.slider.hide();
    } else {
      window.slider.show();
    }

    setEffectLevel(Effect.MAX);
    applyEffectLevel(currentFilterName);
  };


  // Удаление класса с фильтром
  const removeFilter = () => {
    for (let i = 0; i < photoPreview.classList.length; i++) {
      const filterName = photoPreview.classList[i];
      if (filterName.startsWith(`effects__preview--`)) {
        photoPreview.classList.remove(filterName);
      }
    }
  };

  const setEffectLevel = (level) => {
    effectLevel.value = level;
    applyEffectLevel(currentFilterName);
  };

  // Установить насыщенность

  const applyEffectLevel = (filterName) => {
    const filter = {
      chrome: `grayscale(${effectLevel.value / Effect.MAX})`,
      sepia: `sepia(${effectLevel.value / Effect.MAX})`,
      marvin: `invert(${effectLevel.value}%)`,
      phobos: `blur(${(effectLevel.value * Effect.BLUR_MAX) / Effect.MAX}px)`,
      heat: `brightness(${(effectLevel.value * Effect.BRIGHTNESS_MAX) / Effect.MAX + Effect.BRIGHTNESS_MIN})`,
      default: ``,
    };

    photoPreview.style.filter = filter[filterName] || filter[`default`];
  };


  // Выбор фильтра
  const photoFilterChangeHandler = (evt) => {
    if (evt.target && evt.target.matches(`.effects__radio`)) {
      photoPreviewDefaultSettings();
      setFilter(evt.target.value);
    }
  };
  uploadPhotoForm.addEventListener(`change`, photoFilterChangeHandler);

  window.slider.addEventListener(`change`, setEffectLevel);

  // Открыть/закрыть форму
  const openEditPhotoForm = () => {
    editPhotoForm.classList.remove(`hidden`);
    window.main.body.classList.add(`modal-open`);
    window.addEventListener(`keydown`, inEditPhotoFormEscPress);
    setFilter(`none`);
    imageScaleValue.value = `${Effect.MAX}%`;
  };

  const closeEditPhotoForm = () => {
    editPhotoForm.classList.add(`hidden`);
    window.main.body.classList.remove(`modal-open`);
    window.removeEventListener(`keydown`, inEditPhotoFormEscPress);
  };

  closeEditPhotoFormButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    closeEditPhotoForm();
  });

  const inEditPhotoFormEscPress = (evt) => {
    if (textHashtags === document.activeElement) {
      return;
    }

    if (evt.key === window.helpers.ESC) {
      evt.preventDefault();
      closeEditPhotoForm();
    }
  };

  // Выбор размера изображения
  const imageScale = document.querySelector(`.img-upload__scale`);
  const zoomOutButton = imageScale.querySelector(`.scale__control--smaller`);
  const zoomInButton = imageScale.querySelector(`.scale__control--bigger`);
  const imageScaleValue = imageScale.querySelector(`.scale__control--value`);
  let currentImageScaleValue = Effect.MAX;

  zoomOutButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    if (Effect.MIN < currentImageScaleValue) {
      currentImageScaleValue -= Effect.STEP;
      photoPreview.style.transform = `scale(${currentImageScaleValue / Effect.MAX})`;
      imageScaleValue.value = `${currentImageScaleValue}%`;
    }
  });

  zoomInButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    if (currentImageScaleValue < Effect.MAX) {
      currentImageScaleValue += Effect.STEP;
      photoPreview.style.transform = `scale(${currentImageScaleValue / Effect.MAX})`;
      imageScaleValue.value = `${currentImageScaleValue}%`;
    }
  });

  // Валидация хэштегов
  textHashtags.addEventListener(`input`, () => {
    const errorMessage = window.hashtagsValidity.check(textHashtags.value);

    textHashtags.setCustomValidity(errorMessage);
    textHashtags.reportValidity();
  });

  window.editForm = {
    open: openEditPhotoForm,
  };
})();
