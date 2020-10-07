"use strict";

const getComment = function () {
  const MESSAGES = window.getCommentMessages();
  const NAMES = window.getName();
  const avatarNumber = window.getRandomNumber(1, 6);
  const name = NAMES[window.getRandomNumber(0, NAMES.length - 1)];
  const message = MESSAGES[window.getRandomNumber(0, MESSAGES.length - 1)];
  return {
    avatar: "img/avatar-" + avatarNumber + ".svg",
    message: message,
    name: name,
  };
};

window.getPhotoData = function () {
  const photoData = [];

  for (let i = 0; i < 25; i++) {
    const MIN_LIKES = 15;
    const MAX_LIKES = 200;
    const url = "photos/" + (i + 1) + ".jpg";
    const likes = window.getRandomNumber(MIN_LIKES, MAX_LIKES);
    const comments = [];
    const commentsQty = likes / 10;

    for (let j = 0; j < commentsQty; j++) {
      comments[j] = getComment();
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

window.checkHashtagsValidity = function () {
  window.hashtagsString = window.hashtagsString.toLowerCase();
  let hashtagsArray = window.hashtagsString.split(" ").filter((elem) => elem !== "");
  window.errorMessage = "";
  const re = /^#[a-zA-Z0-9]*$/;
  const MIN_HASHTAG_LENGTH = 2;
  const MAX_HASHTAG_LENGTH = 20;
  const MAX_HASHTAG_QUANTITY = 5;

  for (let i = 0; i < hashtagsArray.length; i++) {
    let hashtag = hashtagsArray[i];

    for (let j = i + 1; j < hashtagsArray.length; j++) {
      if (hashtagsArray[i] === hashtagsArray[j]) {
        window.errorMessage = "Такой хэштег уже есть";
      }
    }

    if (re.test(hashtag) === false) {
      window.errorMessage = "Хэштег должен начинаться с символа # и состоять только из букв и цифр";
    } else if (hashtag.length < MIN_HASHTAG_LENGTH) {
      window.errorMessage = "Добавьте буквы или цифры";
    } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
      window.errorMessage = "Длина хэштега не должна превышать 20 символов";
    }
  }

  if (hashtagsArray.length > MAX_HASHTAG_QUANTITY) {
    window.errorMessage = "Количество хэштегов не должно быть больше 5";
  }
};
