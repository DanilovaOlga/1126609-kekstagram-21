'use strict';

(function () {
  const filters = document.querySelector(`.img-filters`);
  const filtersButtons = filters.querySelectorAll(`.img-filters__button`);
  const filterDefault = filters.querySelector(`#filter-default`);
  const filterRandom = filters.querySelector(`#filter-random`);
  const filterDiscussed = filters.querySelector(`#filter-discussed`);

  const applyRandomFilter = function (datas) {
    datas = datas.slice();

    const result = [];
    for (let i = 0; i < 10; i++) {
      let index = window.helpers.getRandomIndex(datas);
      result.push(datas[index]);
      datas.splice(index, 1);
    }

    return result;
  };

  const applyPopularFilter = function (datas) {
    datas = datas.slice();

    datas.sort(function (prewPhoto, nextPhoto) {
      let a = prewPhoto.comments.length;
      let b = nextPhoto.comments.length;

      if (a > b) {
        return -1;
      }
      if (a === b) {
        return 0;
      }
      if (a < b) {
        return 1;
      }

      return datas;
    });

    return datas;
  };

  const initFilters = (cb, datas) => {
    filters.classList.remove("img-filters--inactive");

    filtersButtons.forEach((button) => {
      button.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        filtersButtons.forEach((filterButton) => {
          filterButton.classList.remove(`img-filters__button--active`);
        });

        button.classList.add(`img-filters__button--active`);

        switch (button) {
          case filterDefault:
            cb(datas);
            break;
          case filterRandom:
            cb(applyRandomFilter(datas));
            break;
          case filterDiscussed:
            cb(applyPopularFilter(datas));
            break;
        }

      });
    });
  };

  window.filters = {
    init: initFilters,
  };
})();
