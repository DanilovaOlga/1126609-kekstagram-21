"use strict";

const photoData = window.getPhotoData();
const pictures = document.querySelector(".pictures");
const pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");
const bigPicture = document.querySelector(".big-picture");

window.placePhotosToPictures(photoData, pictures, pictureTemplate);
window.showBigPhoto(photoData[0]);
