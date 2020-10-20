"use strict";

(function () {

  const placeDataToBigPhoto = function (photoData, bigPhotoElem) {

    // Добавить фото и описание
    bigPhotoElem.querySelector(".big-picture__img img").src = photoData.url;
    const bigPictureSocial = bigPhotoElem.querySelector(".big-picture__social");
    bigPictureSocial.querySelector(".likes-count").textContent = photoData.likes;
    bigPictureSocial.querySelector(".social__caption").textContent = photoData.description;
    bigPictureSocial.querySelector(".comments-count").textContent = photoData.comments.length;

    // Удалить все коменты
    const socialComments = bigPictureSocial.querySelector(".social__comments");
    const socialComment = bigPictureSocial.querySelector(".social__comment");
    const socialCommentChildList = socialComments.children;
    for (let i = 0; i < socialCommentChildList.length;) {
      socialComments.removeChild(socialCommentChildList[i]);
    }

    // Добавить коменты
    for (let i = 0; i < photoData.comments.length; i++) {
      socialComment.querySelector(".social__picture").src = photoData.comments[i].avatar;
      socialComment.querySelector(".social__picture").alt = photoData.comments[i].name;
      socialComment.querySelector(".social__text").textContent = photoData.comments[i].message;
      socialComments.appendChild(socialComment.cloneNode(true));
    }
  };

  const showBigPhoto = function (photoNumber) {
    // закомментировать, чтобы убрать превью \/
    // document.querySelector("body").classList.add("modal-open");
    // window.bigPicture.classList.remove("hidden");
    // закомментировать, чтобы убрать превью /\
    window.preview.placeDataToBigPhoto(photoNumber, window.bigPicture);
    document.querySelector(".social__comment-count").classList.add("hidden");
    document.querySelector(".comments-loader").classList.add("hidden");
  };

  window.preview = {
    placeDataToBigPhoto: placeDataToBigPhoto,
    showBigPhoto: showBigPhoto,
  };
})();
