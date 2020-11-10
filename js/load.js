'use strict';

const StatusCode = {
  OK: 200
};
const Url = {
  GET: `https://21.javascript.pages.academy/keksobooking/data`,
  POST: `https://21.javascript.pages.academy/keksobooking`
};
const TIMEOUT_IN_MS = 10000;

window.load = (onSuccess, onError, data) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  if (data) {
    xhr.open(`POST`, Url.POST);
    xhr.addEventListener(`load`, () => {
      onSuccess(xhr.response);
    });
    xhr.send(data);
  } else {
    xhr.open(`GET`, Url.GET);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа ${xhr.status}. ${xhr.statusText}`);
      }
    });
    xhr.send();
  }

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за  ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;
};
