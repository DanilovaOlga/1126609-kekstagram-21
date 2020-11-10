'use strict';

const TIMEOUT = 10000;
const Code = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
};

const request = (params) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.addEventListener(`load`, () => {
    let error;
    switch (xhr.status) {
      case Code.OK:
        params.onSuccess(xhr.response);
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
      params.onError(error);
    }
  });

  xhr.addEventListener(`error`, () => {
    params.onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    params.onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT;
  xhr.open(params.method, params.url);
  xhr.send(params.data);
};

window.backend = {
  request: request,
};
