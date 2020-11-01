'use strict';

(function () {
  const TIMEOUT = 10000;
  const URL = `https://21.javascript.pages.academy/kekstagram/data`;

  const loadData = (onSuccess, onError) => {
    const code = {
      OK: 200,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      NOT_FOUND: 404,
    };
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;
    xhr.addEventListener(`load`, () => {
      let error;
      switch (xhr.status) {
        case code.OK:
          onSuccess(xhr.response);
          break;
        case code.BAD_REQUEST:
          error = `Неверный запрос`;
          break;
        case code.UNAUTHORIZED:
          error = `Пользователь не авторизован`;
          break;
        case code.NOT_FOUND:
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
    xhr.open(`GET`, URL);
    xhr.send();
  };

  window.backend = {
    load: loadData,
  };
})();
