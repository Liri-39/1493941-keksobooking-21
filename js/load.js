'use strict';

const StatusCode = {
  OK: 200,
  SERVER_ERROR: 404
};
const Url = {
  GET: `https://21.javascript.pages.academy/keksobooking/data`,
  POST: `https://21.javascript.pages.academy/keksobooking`
};
const TIMEOUT_IN_MS = 10000;

window.loadData = (onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.open(`GET`, Url.GET);

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа ${xhr.status}. ${xhr.statusText}`);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за  ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.send();
};

window.upload = (data, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    onSuccess(xhr.response);
  });

  xhr.open(`POST`, Url.POST);
  xhr.send(data);

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за  ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;
};
