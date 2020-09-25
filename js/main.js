"use strict";

const getRandomNumber = function (min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
};

const getPhotoData = function () {
  const photoData = [];

  for (let i = 0; i < 25; i++) {
    const MIN_LIKES = 15;
    const MAX_LIKES = 200;
    const likes = getRandomNumber(MIN_LIKES, MAX_LIKES);
    const url = "photos/" + (i + 1) + ".jpg";
    const comments = [];
    const commentsLength = likes / 10;

    for (let j = 0; j < commentsLength; j++) {
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
  const MESSAGES = [
    "Всё отлично!",
    "В целом всё неплохо. Но не всё.",
    "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
    "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
    "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
    "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
  ];
  const NAMES = [
    "Иван",
    "Петр",
    "Мария",
    "Нина",
    "Саша",
  ];
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

for (let i = 0; i < getPhotoData().length; i++) {
  const picture = pictureTemplate.cloneNode(true);
  const photoDataItem = getPhotoData()[i];
  picture.querySelector(".picture__img").src = photoDataItem.url;
  picture.querySelector(".picture__likes").textContent = photoDataItem.likes;
  picture.querySelector(".picture__comments").textContent = photoDataItem.comments;
  pictures.appendChild(picture);
}
