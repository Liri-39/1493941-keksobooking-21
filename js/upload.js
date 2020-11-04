'use strict';
(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const TIMEOUT_IN_MS = 1000;
  window.upload = function (data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      onSuccess(xhr.response);
    });

    xhr.open(`POST`, URL);
    xhr.send(data);

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за  ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };
})();
