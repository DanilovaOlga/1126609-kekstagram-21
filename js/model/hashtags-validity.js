"use strict";

(function () {

  const re = /^#[a-zA-Z0-9]*$/;
  const MIN_HASHTAG_LENGTH = 2;
  const MAX_HASHTAG_LENGTH = 20;
  const MAX_HASHTAG_QUANTITY = 5;

  const checkTag = function (hashtag) {

    if (re.test(hashtag) === false) {
      return "Хэштег должен начинаться с символа # и состоять только из букв и цифр";
    }

    if (hashtag.length < MIN_HASHTAG_LENGTH) {
      return "Добавьте буквы или цифры";
    }

    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      return "Длина хэштега не должна превышать 20 символов";
    }

    return "";
  };

  const checkHashtagsValidity = function (hashtagsString) {
    hashtagsString = hashtagsString.toLowerCase();
    let hashtagsArray = hashtagsString.split(" ").filter((elem) => elem !== "");

    if (hashtagsArray.length > MAX_HASHTAG_QUANTITY) {
      return "Количество хэштегов не должно быть больше 5";
    }

    for (let i = 0; i < hashtagsArray.length; i++) {
      let hashtag = hashtagsArray[i];

      for (let j = i + 1; j < hashtagsArray.length; j++) {
        if (hashtag === hashtagsArray[j]) {
          return "Такой хэштег уже есть";
        }
      }

      const msg = checkTag(hashtag);
      if (msg) {
        return msg;
      }
    }

    return "";
  };

  window.hashtagsValidity = {
    checkHashtagsValidity: checkHashtagsValidity,
  };
})();
