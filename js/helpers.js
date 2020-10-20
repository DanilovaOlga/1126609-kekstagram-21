"use strict";

(function () {
  const getRandomNumber = function (min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  window.helpers = {
    getRandomNumber: getRandomNumber,
  };
})();
