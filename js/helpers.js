'use strict';

(function () {
  const getRandomNumber = function (min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  const Keys = {
    ESC: `Escape`,
    LEFT: `ArrowLeft`,
    RIGHT: `ArrowRight`,
  };

  window.helpers = {
    getRandomNumber: getRandomNumber,
    ESC: Keys.ESC,
    LEFT: Keys.LEFT,
    RIGHT: Keys.RIGHT,
  };
})();
