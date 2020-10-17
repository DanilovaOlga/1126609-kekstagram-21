"use strict";

(function () {

  const getComment = function () {
    const MESSAGES = window.data.getCommentMessages();
    const NAMES = window.data.getName();
    const avatarNumber = window.getRandomNumber(1, 6);
    const name = NAMES[window.getRandomNumber(0, NAMES.length - 1)];
    const message = MESSAGES[window.getRandomNumber(0, MESSAGES.length - 1)];
    return {
      avatar: "img/avatar-" + avatarNumber + ".svg",
      message: message,
      name: name,
    };
  };

  const getPhotoData = function () {
    const photoData = [];

    for (let i = 0; i < 25; i++) {
      const MIN_LIKES = 15;
      const MAX_LIKES = 200;
      const url = "photos/" + (i + 1) + ".jpg";
      const likes = window.getRandomNumber(MIN_LIKES, MAX_LIKES);
      const comments = [];
      const commentsQty = likes / 10;

      for (let j = 0; j < commentsQty; j++) {
        comments[j] = window.photoData.getComment();
      }

      photoData[i] = {
        url: url,
        description: "описание фотографии",
        likes: likes,
        comments: comments,
      };
    }
    return photoData;
  };

  window.photoData = {
    getComment: getComment,
    getPhotoData: getPhotoData,
  }
})();
