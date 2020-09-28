"use strict";

window.getRandomNumber = function (min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
};
