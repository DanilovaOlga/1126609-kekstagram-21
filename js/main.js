"use strict";

(function () {

  const pictures = document.querySelector(".pictures");
  const pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");
  const uploadPhotoButton = window.uploadPhotoForm.querySelector("#upload-file");
  const errorBanner = document.querySelector(".error-banner");

  window.bigPicture = document.querySelector(".big-picture");
  window.body = document.querySelector("body");

  window.loadData.loadData(function (photoData) {
    window.gallery.placePhotosToPictures(photoData, pictures, pictureTemplate);
  }, function (error) {
    errorBanner.style.display = "block";
    errorBanner.textContent = error;
  });

  uploadPhotoButton.addEventListener("change", function (evt) {
    evt.preventDefault();
    window.editForm.open();
  });

})();
