"use strict";

(function () {

  const photoData = window.photoData.getPhotoData();
  const pictures = document.querySelector(".pictures");
  const pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");
  const uploadPhotoButton = window.uploadPhotoForm.querySelector("#upload-file");

  window.bigPicture = document.querySelector(".big-picture");
  window.body = document.querySelector("body");

  window.gallery.placePhotosToPictures(photoData, pictures, pictureTemplate);
  window.preview.showBigPhoto(photoData[0]);

  uploadPhotoButton.addEventListener("change", function (evt) {
    evt.preventDefault();
    window.editForm.open();
  });

})();
