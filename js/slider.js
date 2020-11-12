'use strict';

const EFFECT_STEP = 1;
const MAX_VALUE = 100;
const MIN_VALUE = 0;
const effectLevelSlider = document.querySelector(`.effect-level`);
const effectLevelLine = effectLevelSlider.querySelector(`.effect-level__line`);
const effectLevelDepth = effectLevelSlider.querySelector(`.effect-level__depth`);
const effectLevelPin = effectLevelSlider.querySelector(`.effect-level__pin`);
const callbacks = [];

const changeValue = (type, cb) => {
  callbacks.push(cb);
};

effectLevelPin.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();
  effectLevelPin.focus();
  let coordX = evt.clientX;

  const onMouseMove = (moveEvt) => {

    moveEvt.preventDefault();

    const shift = coordX - moveEvt.clientX;

    coordX = moveEvt.clientX;

    const newLeft = effectLevelPin.offsetLeft - shift;

    if (newLeft >= MIN_VALUE && newLeft <= effectLevelLine.clientWidth) {
      const value = Math.round((newLeft / effectLevelLine.clientWidth) * MAX_VALUE);
      setValue(value);
    }
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

effectLevelPin.addEventListener(`keydown`, (evt) => {
  if (evt.code === window.helpers.LEFT) {
    evt.preventDefault();

    if (getValue() > MIN_VALUE) {
      setValue(getValue() - EFFECT_STEP);
    }
  }

  if (evt.code === window.helpers.RIGHT) {
    evt.preventDefault();

    if (getValue() < MAX_VALUE) {
      setValue(getValue() + EFFECT_STEP);
    }
  }
});

const getValue = () => {
  return Math.round((effectLevelPin.offsetLeft / effectLevelLine.clientWidth) * MAX_VALUE);
};

const setValue = (value) => {
  effectLevelPin.style.left = `${value}%`;
  effectLevelDepth.style.width = `${value}%`;
  callbacks.forEach((cb) => cb(value));
};

const show = () => {
  effectLevelSlider.style.display = `block`;
};

const hide = () => {
  effectLevelSlider.style.display = `none`;
};

window.slider = {
  show,
  hide,
  change: changeValue,
  setValue,
};
