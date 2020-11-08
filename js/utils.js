'use strict';

(function () {
  const Keys = {
    isEnter(evt) {
      return evt.key === `Enter`;
    },
    isEscape(evt) {
      return evt.key === `Escape`;
    },
  };
  const escapePressHandler = function (evt) {
    if (Keys.isEscape(evt)) {
      window.page.closePopup();
    }
  };
  const buttonClickHandler = function () {
    window.page.closePopup();
  };
  window.util = {
    escapePressHandler,
    buttonClickHandler,
    Keys
  };
})();
