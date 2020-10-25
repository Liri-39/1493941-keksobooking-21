'use strict';

const map = document.querySelector(`.map`);
const mainPin = map.querySelector(`.map__pin--main`);

window.form.formDeactivateHandler();

mainPin.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    window.form.formActivateHandler();
  }

});
mainPin.addEventListener(`keydown`, function (evt) {
  if (window.page.Keys.isEnter(evt)) {
    window.form.formActivateHandler();
  }
});
