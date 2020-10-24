'use strict';

const map = document.querySelector(`.map`);
const mainPin = map.querySelector(`.map__pin--main`);

form.formDeactivateHandler();

mainPin.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    form.formActivateHandler();
  }
});
mainPin.addEventListener(`keydown`, function (evt) {
  if (page.Keys.isEnter(evt)) {
    form.formActivateHandler();
  }
});
