'use strict';

const Keys = {
  isEnter(evt) {
    return evt.key === `Enter`;
  },
  isEscape(evt) {
    return evt.key === `Escape`;
  },
};
const DEBOUNCE_INTERVAL = 500;
let lastTimeout;
const escapePressHandler = function (evt) {
  if (Keys.isEscape(evt)) {
    window.page.closePopup();
  }
};
const buttonClickHandler = function () {
  window.page.closePopup();
};

const debounce = function (cb) {
  if (lastTimeout) {
    clearTimeout(lastTimeout);
  }
  lastTimeout = setTimeout(cb, DEBOUNCE_INTERVAL);
};

window.util = {
  escapePressHandler,
  buttonClickHandler,
  Keys,
  debounce
};
