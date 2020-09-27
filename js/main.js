"use strict";

const getRandomNumber = function (min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
};

const getPhotoData = function () {
  const photoData = [];

  for (let i = 0; i < 25; i++) {
    const MIN_LIKES = 15;
    const MAX_LIKES = 200;
    const url = "photos/" + (i + 1) + ".jpg";
    const likes = getRandomNumber(MIN_LIKES, MAX_LIKES);
    const comments = [];
    const commentsQty = likes / 10;

    for (let j = 0; j < commentsQty; j++) {
      comments[j] = getComment();
    }

    photoData[i] = {
      url: url,
      description: "описание фотографии",
      likes: likes,
      comments: comments.length
    };
  }
  return photoData;
};

const getComment = function () {
  const MESSAGES = window.getCommentMessages();
  const NAMES = window.getName();
  const avatarNumber = getRandomNumber(1, 6);
  const name = NAMES[getRandomNumber(0, NAMES.length - 1)];
  const message = MESSAGES[getRandomNumber(0, MESSAGES.length - 1)];
  return {
    avatar: "img/avatar-" + avatarNumber + ".svg",
    message: message,
    name: name,
  };
};

const pictures = document.querySelector(".pictures");
const pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");
const photoData = getPhotoData();

for (let i = 0; i < photoData.length; i++) {
  const picture = pictureTemplate.cloneNode(true);
  const photoDataItem = photoData[i];
  picture.querySelector(".picture__img").src = photoDataItem.url;
  picture.querySelector(".picture__likes").textContent = photoDataItem.likes;
  picture.querySelector(".picture__comments").textContent = photoDataItem.comments;
  pictures.appendChild(picture);
}
