'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const UPLOAD_URL = `https://21.javascript.pages.academy/kekstagram`;
const Effect = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
  BLUR_MAX: 3,
  BRIGHTNESS_MAX: 3,
  BRIGHTNESS_MIN: 1,
};

const uploadPhotoForm = document.querySelector(`.img-upload__form`);
const editPhotoForm = uploadPhotoForm.querySelector(`.img-upload__overlay`);
const closeEditPhotoFormButton = uploadPhotoForm.querySelector(`.img-upload__cancel`);
const photoPreview = editPhotoForm.querySelector(`.img-upload__preview img`);
const effectLevel = document.querySelector(`.effect-level__value`);
const textHashtags = uploadPhotoForm.querySelector(`.text__hashtags`);
const comment = document.querySelector(`.text__description`);
const noneEffectInput = uploadPhotoForm.querySelector(`#effect-none`);
const main = document.querySelector(`main`);
const effectsPreview = editPhotoForm.querySelectorAll(`.effects__preview`);
let currentFilterName = `none`;

const photoPreviewDefaultSettings = () => {
  setFilter(`none`);
  noneEffectInput.checked = true;
  currentImageScaleValue = Effect.MAX;
  imageScaleValue.value = `${Effect.MAX}%`;
  photoPreview.style.transform = `scale(1)`;
  window.slider.setValue(Effect.MAX);
  textHashtags.setCustomValidity(``);
  comment.setCustomValidity(``);
};

const setFilter = (filterName) => {
  currentFilterName = filterName;
  removeFilter();
  photoPreview.classList.add(`effects__preview--${filterName}`);
  if (filterName === `none`) {
    window.slider.hide();
  } else {
    window.slider.show();
  }

  applyEffectLevel(currentFilterName);
};

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


const photoFilterChangeHandler = (evt) => {
  if (evt.target && evt.target.matches(`.effects__radio`)) {
    setFilter(evt.target.value);
  }
};
uploadPhotoForm.addEventListener(`change`, photoFilterChangeHandler);

window.slider.change(`change`, setEffectLevel);

const loadPhoto = () => {
  const file = window.main.uploadPhotoButton.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some(function (extension) {
    return fileName.endsWith(extension);
  });

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener(`load`, function () {
      window.editForm.preview.src = reader.result;
      effectsPreview.forEach((preview) => {
        preview.style.backgroundImage = `url(${reader.result})`;
      });
    });
    reader.readAsDataURL(file);
    openEditPhotoForm();
  }
};

const openEditPhotoForm = () => {
  editPhotoForm.classList.remove(`hidden`);
  window.main.body.classList.add(`modal-open`);
  window.addEventListener(`keydown`, inEditPhotoFormEscPress);
  photoPreviewDefaultSettings();
};

const closeEditPhotoForm = () => {
  editPhotoForm.classList.add(`hidden`);
  window.main.body.classList.remove(`modal-open`);
  window.removeEventListener(`keydown`, inEditPhotoFormEscPress);
  uploadPhotoForm.reset();
};

closeEditPhotoFormButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  closeEditPhotoForm();
});

const inEditPhotoFormEscPress = (evt) => {
  if (textHashtags === document.activeElement || comment === document.activeElement) {
    return;
  }

  if (evt.key === window.helpers.ESC) {
    evt.preventDefault();
    closeEditPhotoForm();
  }
};

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

textHashtags.addEventListener(`input`, () => {
  const errorMessage = window.hashtagsValidity.check(textHashtags.value);

  textHashtags.setCustomValidity(errorMessage);
  textHashtags.reportValidity();
});

comment.addEventListener(`input`, () => {
  const errorMessage = window.commentValidity.check(comment.value);

  comment.setCustomValidity(errorMessage);
  comment.reportValidity();
});

const showMessage = (status) => {
  const template = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
  const message = template.cloneNode(true);
  const button = message.querySelector(`.${status}__button`);

  main.appendChild(message);

  const removeMessage = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    main.removeChild(message);
    window.removeEventListener(`keydown`, inMessageEscPress);
  };

  const inMessageEscPress = (evt) => {
    if (evt.key === window.helpers.ESC) {
      removeMessage(evt);
    }
  };
  window.addEventListener(`keydown`, inMessageEscPress);

  button.addEventListener(`click`, removeMessage);
  message.addEventListener(`click`, removeMessage);
};

uploadPhotoForm.addEventListener(`submit`, (evt) => {
  window.backend.request({
    onSuccess: () => {
      closeEditPhotoForm();
      showMessage(`success`);
    },
    onError: () => {
      closeEditPhotoForm();
      showMessage(`error`);
    },
    url: UPLOAD_URL,
    method: `POST`,
    data: new FormData(uploadPhotoForm),
  });
  evt.preventDefault();
});

window.editForm = {
  open: loadPhoto,
  preview: photoPreview,
};
