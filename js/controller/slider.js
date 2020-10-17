"use strict";

(function () {
  const effectLevelSlider = document.querySelector(".effect-level");
  const effectLevelLine = effectLevelSlider.querySelector(".effect-level__line");
  const effectLevelDepth = effectLevelSlider.querySelector(".effect-level__depth");
  const effectLevelPin = effectLevelSlider.querySelector(".effect-level__pin");
  window.effectLevel = effectLevelSlider.querySelector(".effect-level__value");

  const addEventListener = function (type, cb) {

    effectLevelPin.addEventListener("mouseup", () => {
      const value = Math.round((effectLevelDepth.clientWidth / effectLevelLine.clientWidth) * 100);
      cb(value);
    });

  };

  const show = function () {
    effectLevelSlider.style.display = "block";
  };

  const hide = function () {
    effectLevelSlider.style.display = "none";
  };

  window.slider = {
    show: show,
    hide: hide,
    addEventListener: addEventListener,
  }
})();
