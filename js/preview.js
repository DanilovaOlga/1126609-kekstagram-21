'use strict';

(function () {

  const bigPicture = document.querySelector(`.big-picture`);
  const placeDataToBigPhoto = (photoData, bigPhotoElem) => {

    // Добавить фото и описание
    bigPhotoElem.querySelector(`.big-picture__img img`).src = photoData.url;
    const bigPictureSocial = bigPhotoElem.querySelector(`.big-picture__social`);
    bigPictureSocial.querySelector(`.likes-count`).textContent = photoData.likes;
    bigPictureSocial.querySelector(`.social__caption`).textContent = photoData.description;
    bigPictureSocial.querySelector(`.comments-count`).textContent = photoData.comments.length;

    // Удалить все коменты
    const socialComments = bigPictureSocial.querySelector(`.social__comments`);
    const socialComment = bigPictureSocial.querySelector(`.social__comment`);
    const socialCommentChildList = socialComments.children;
    for (let i = 0; i < socialCommentChildList.length;) {
      socialComments.removeChild(socialCommentChildList[i]);
    }

    // Добавить коменты
    for (let i = 0; i < photoData.comments.length; i++) {
      socialComment.querySelector(`.social__picture`).src = photoData.comments[i].avatar;
      socialComment.querySelector(`.social__picture`).alt = photoData.comments[i].name;
      socialComment.querySelector(`.social__text`).textContent = photoData.comments[i].message;
      socialComments.appendChild(socialComment.cloneNode(true));
    }
  };

  const showBigPhoto = (onePhotoData) => {
    window.main.body.classList.add(`modal-open`);
    bigPicture.classList.remove(`hidden`);
    window.preview.placeDataToBigPhoto(onePhotoData, bigPicture);
    document.querySelector(`.social__comment-count`).classList.add(`hidden`);
    document.querySelector(`.comments-loader`).classList.add(`hidden`);
    window.addEventListener(`keydown`, inShowBigPhotoEscPress);
  };

  const closeBigPictureButton = bigPicture.querySelector(`.big-picture__cancel`);

  const closeBigPicture = () => {
    window.main.body.classList.remove(`modal-open`);
    bigPicture.classList.add(`hidden`);
    window.removeEventListener(`keydown`, inShowBigPhotoEscPress);
  };

  const inShowBigPhotoEscPress = (evt) => {
    if (evt.key === window.helpers.ESC) {
      evt.preventDefault();
      closeBigPicture();
    }
  };

  closeBigPictureButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    closeBigPicture();
  });

  window.preview = {
    placeDataToBigPhoto: placeDataToBigPhoto,
    show: showBigPhoto,
  };
})();
