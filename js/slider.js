'use strict';

(function () {
  const effectLevelSlider = document.querySelector(`.effect-level`);
  const effectLevelLine = effectLevelSlider.querySelector(`.effect-level__line`);
  const effectLevelDepth = effectLevelSlider.querySelector(`.effect-level__depth`);
  const effectLevelPin = effectLevelSlider.querySelector(`.effect-level__pin`);

  const addEventListener = (type, cb) => {

    effectLevelPin.addEventListener(`mouseup`, () => {
      const value = Math.round((effectLevelDepth.clientWidth / effectLevelLine.clientWidth) * 100);
      cb(value);
    });

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
  };
})();
