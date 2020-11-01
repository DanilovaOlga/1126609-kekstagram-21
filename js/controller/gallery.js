'use strict';

(function () {

  const pictures = document.querySelector(`.pictures`);
  const template = document.querySelector(`#picture`).content.querySelector(`.picture`);

  const renderPhoto = (photo) => {
    const picture = template.cloneNode(true);

    picture.querySelector(`.picture__img`).src = photo.url;
    picture.querySelector(`.picture__likes`).textContent = photo.likes;
    picture.querySelector(`.picture__comments`).textContent = photo.comments.length;

    return picture;
  };

  const renderPhotos = (photos) => {
    const fragment = document.createDocumentFragment();

    photos.forEach((item) => {
      fragment.appendChild(renderPhoto(item));
    });

    pictures.appendChild(fragment);
  };

  window.gallery = {
    render: renderPhotos,
  };
})();
