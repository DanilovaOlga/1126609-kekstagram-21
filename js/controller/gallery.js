"use strict";

(function () {

  window.gallery = {

    placePhotosToPictures: function (photos, pictures, template) {
    for (let i = 0; i < photos.length; i++) {
      const picture = template.cloneNode(true);
      const photoDataItem = photos[i];
      picture.querySelector(".picture__img").src = photoDataItem.url;
      picture.querySelector(".picture__likes").textContent = photoDataItem.likes;
      picture.querySelector(".picture__comments").textContent = photoDataItem.comments.length;
      pictures.appendChild(picture);
    }
  }
}
})();
