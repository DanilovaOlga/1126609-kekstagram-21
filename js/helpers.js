'use strict';

(function () {
  const Keys = {
    ESC: `Escape`,
    LEFT: `ArrowLeft`,
    RIGHT: `ArrowRight`,
  };

  const getRandomNumber = function (min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  const getRandomIndex = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  window.helpers = {
    getRandomNumber: getRandomNumber,
    getRandomIndex: getRandomIndex,
    ESC: Keys.ESC,
    LEFT: Keys.LEFT,
    RIGHT: Keys.RIGHT,
  };
})();
