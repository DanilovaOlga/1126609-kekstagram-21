'use strict';

(function () {
  const EFFECT_STEP = 1;
  const effectLevelSlider = document.querySelector(`.effect-level`);
  const effectLevelLine = effectLevelSlider.querySelector(`.effect-level__line`);
  const effectLevelDepth = effectLevelSlider.querySelector(`.effect-level__depth`);
  const effectLevelPin = effectLevelSlider.querySelector(`.effect-level__pin`);
  const callbacks = [];

  const addEventListener = (type, cb) => {
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

      if (newLeft >= 0 && newLeft <= effectLevelLine.clientWidth) {
        const value = Math.round((newLeft / effectLevelLine.clientWidth) * 100);
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

      if (getValue() > 0) {
        setValue(getValue() - EFFECT_STEP);
      }
    }

    if (evt.code === window.helpers.RIGHT) {
      evt.preventDefault();

      if (getValue() < 100) {
        setValue(getValue() + EFFECT_STEP);
      }
    }
  });

  const getValue = () => {
    return Math.round((effectLevelPin.offsetLeft / effectLevelLine.clientWidth) * 100);
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
    show: show,
    hide: hide,
    addEventListener: addEventListener,
    setValue: setValue,
    getValue: getValue,
  };
})();
