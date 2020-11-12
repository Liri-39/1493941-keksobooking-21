'use strict';

const map = document.querySelector(`.map`);
const mainPin = map.querySelector(`.map__pin--main`);

window.form.formDeactivateHandler();

mainPin.addEventListener(`mousedown`, window.form.formActivateHandler);
mainPin.addEventListener(`keydown`, window.form.formActivateHandler);
