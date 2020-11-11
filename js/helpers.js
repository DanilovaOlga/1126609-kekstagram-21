'use strict';

const Keys = {
  ESC: `Escape`,
  LEFT: `ArrowLeft`,
  RIGHT: `ArrowRight`,
};

const getRandomIndex = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

window.helpers = {
  getRandomIndex,
  ESC: Keys.ESC,
  LEFT: Keys.LEFT,
  RIGHT: Keys.RIGHT,
};
