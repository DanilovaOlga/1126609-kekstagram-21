"use strict";

(function () {

  const checkHashtagsValidity = function () {
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

  window.hashtagsValidity = {
    checkHashtagsValidity: checkHashtagsValidity,
  };
})();
