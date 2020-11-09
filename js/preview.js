'use strict';

(function () {

  const COMMENTS_NUMBER = 5;
  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureSocial = bigPicture.querySelector(`.big-picture__social`);
  const socialComments = bigPictureSocial.querySelector(`.social__comments`);
  const socialComment = bigPictureSocial.querySelector(`.social__comment`);
  const loaderButton = bigPictureSocial.querySelector(`.social__comments-loader`);
  const socialCommentCount = bigPictureSocial.querySelector(`.social__comment-count`);
  let commentCount = 0;
  let currentPhotoData;

  const addComments = (arr) => {
    arr.forEach((comment) => {
      socialComment.querySelector(`.social__picture`).src = comment.avatar;
      socialComment.querySelector(`.social__picture`).alt = comment.name;
      socialComment.querySelector(`.social__text`).textContent = comment.message;
      socialComments.appendChild(socialComment.cloneNode(true));
    });

    commentCount = socialComments.children.length;
    socialCommentCount.innerHTML = `${commentCount} из <span class="comments-count">${currentPhotoData.comments.length}</span> комментариев`;
    if (commentCount === currentPhotoData.comments.length){
      loaderButton.classList.add(`hidden`);
    }
  };

  loaderButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    addComments(currentPhotoData.comments.slice(commentCount, commentCount + COMMENTS_NUMBER));
  });

  const placeDataToBigPhoto = (photoData) => {
    currentPhotoData = photoData;

    bigPicture.querySelector(`.big-picture__img img`).src = photoData.url;
    bigPictureSocial.querySelector(`.likes-count`).textContent = photoData.likes;
    bigPictureSocial.querySelector(`.social__caption`).textContent = photoData.description;
    bigPictureSocial.querySelector(`.comments-count`).textContent = photoData.comments.length;

    Array.from(socialComments.children).forEach((comment) => {
      socialComments.removeChild(comment)
    });

    addComments(photoData.comments.slice(0, COMMENTS_NUMBER));
  };

  const showBigPhoto = (onePhotoData) => {
    window.main.body.classList.add(`modal-open`);
    bigPicture.classList.remove(`hidden`);
    loaderButton.classList.remove(`hidden`);
    placeDataToBigPhoto(onePhotoData);
    window.addEventListener(`keydown`, inShowBigPhotoEscPress);
  };

  const closeBigPhoto = () => {
    window.main.body.classList.remove(`modal-open`);
    bigPicture.classList.add(`hidden`);
    window.removeEventListener(`keydown`, inShowBigPhotoEscPress);
  };

  const inShowBigPhotoEscPress = (evt) => {
    if (evt.key === window.helpers.ESC) {
      evt.preventDefault();
      closeBigPhoto();
    }
  };

  const closeBigPhotoButton = bigPicture.querySelector(`.big-picture__cancel`);
  closeBigPhotoButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    closeBigPhoto();
  });

  window.preview = {
    show: showBigPhoto,
  };
})();
