'use strict';

(function () {

  const re = /^#[a-zA-Z0-9]*$/;
  const MIN_HASHTAG_LENGTH = 2;
  const MAX_HASHTAG_LENGTH = 20;
  const MAX_HASHTAGS_QUANTITY = 5;

  const checkTag = (hashtag) => {

    if (hashtag.indexOf(`#`, 1) >= 1) {
      return `Хэштеги разделяются пробелами`;
    }

    if (re.test(hashtag) === false) {
      return `Хэштег должен начинаться с символа # и состоять только из букв и цифр`;
    }

    if (hashtag.length < MIN_HASHTAG_LENGTH) {
      return `Хэштег не может состоять только из одной решётки`;
    }

    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      return `Длина хэштега не должна превышать 20 символов`;
    }

    return ``;
  };

  const checkHashtagsValidity = (hashtagsString) => {
    hashtagsString = hashtagsString.toLowerCase().trim();

    if (!hashtagsString) {
      return ``;
    }

    let hashtagsArray = hashtagsString.split(/\s+/);

    if (hashtagsArray.length > MAX_HASHTAGS_QUANTITY) {
      return `Количество хэштегов не должно быть больше 5`;
    }

    for (let i = 0; i < hashtagsArray.length; i++) {
      let hashtag = hashtagsArray[i];

      for (let j = i + 1; j < hashtagsArray.length; j++) {
        if (hashtag === hashtagsArray[j]) {
          return `Такой хэштег уже есть`;
        }
      }

      const msg = checkTag(hashtag);
      if (msg) {
        return msg;
      }
    }

    return ``;
  };

  window.hashtagsValidity = {
    check: checkHashtagsValidity,
  };
})();
