"use strict";

(function () {

  const photoData = window.photoData.getPhotoData();
  const pictures = document.querySelector(".pictures");
  const pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");
  window.bigPicture = document.querySelector(".big-picture");
  window.body = document.querySelector("body");

  window.gallery.placePhotosToPictures(photoData, pictures, pictureTemplate);
  window.preview.showBigPhoto(photoData[0]);

})();
