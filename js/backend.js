'use strict';

(function () {
  const TIMEOUT = 10000;
  const LOAD_URL = `https://21.javascript.pages.academy/kekstagram/data`;
  const UPLOAD_URL = `https://21.javascript.pages.academy/kekstagram`;
  const Code = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
  };

  const loadData = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;
    xhr.addEventListener(`load`, () => {
      let error;
      switch (xhr.status) {
        case Code.OK:
          onSuccess(xhr.response);
          break;
        case Code.BAD_REQUEST:
          error = `Неверный запрос`;
          break;
        case Code.UNAUTHORIZED:
          error = `Пользователь не авторизован`;
          break;
        case Code.NOT_FOUND:
          error = `Ничего не найдено`;
          break;
        default:
          error = `Cтатус ответа: ${xhr.status} ${xhr.statusText}`;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT;
    xhr.open(`GET`, LOAD_URL);
    xhr.send();
  };

  const uploadData = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;
    xhr.addEventListener('load', function () {
      if (xhr.status === Code.OK) {
        onSuccess(xhr.response);
      }
      else {
        onError();
      }
    });

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {
    load: loadData,
    upload: uploadData,
  };
})();
