'use strict';

const MAX_RANDOM_PHOTO = 10;
const TIMEOUT = 500;
const filters = document.querySelector(`.img-filters`);
const filtersButtons = filters.querySelectorAll(`.img-filters__button`);
const filterDefault = filters.querySelector(`#filter-default`);
const filterRandom = filters.querySelector(`#filter-random`);
const filterDiscussed = filters.querySelector(`#filter-discussed`);

const applyRandomFilter = (dataset) => {
  dataset = dataset.slice();

  const result = [];
  for (let i = 0; i < MAX_RANDOM_PHOTO; i++) {
    let index = window.helpers.getRandomIndex(dataset);
    result.push(dataset[index]);
    dataset.splice(index, 1);
  }

  return result;
};

const applyPopularFilter = (dataset) => {
  dataset = dataset.slice();

  dataset.sort((prewPhoto, nextPhoto) => {
    let a = prewPhoto.comments.length;
    let b = nextPhoto.comments.length;

    if (a > b) {
      return -1;
    }
    if (a === b) {
      return 0;
    }
    return 1;
  });

  return dataset;
};

const debounce = (cb) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(() => {
      cb(...args);
    }, TIMEOUT);
  };
};

const initFilters = (showGallery, dataset) => {
  filters.classList.remove(`img-filters--inactive`);

  const setDefaultFilter = debounce(() => {
    showGallery(dataset);
  });

  const setRandomFilter = debounce(() => {
    showGallery(applyRandomFilter(dataset));
  });

  const setPopularFilter = debounce(() => {
    showGallery(applyPopularFilter(dataset));
  });

  filtersButtons.forEach((button) => {
    button.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      filtersButtons.forEach((filterButton) => {
        filterButton.classList.remove(`img-filters__button--active`);
      });

      button.classList.add(`img-filters__button--active`);

      switch (button) {
        case filterDefault:
          setDefaultFilter();
          break;
        case filterRandom:
          setRandomFilter();
          break;
        case filterDiscussed:
          setPopularFilter();
          break;
      }
    });
  });
};

window.filters = {
  init: initFilters,
};
