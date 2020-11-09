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


const fileChooserHandler = (elem1, elem2, flag) => {

  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  if (elem1.files.length > 0) {
    const file = elem1.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, function () {
        if (flag === 1) {
          elem2.src = reader.result;
        } else {
          const imgEl = document.createElement(`img`);
          imgEl.src = reader.result;
          imgEl.width = elem2.offsetWidth;
          imgEl.height = elem2.offsetHeight;
          elem2.appendChild(imgEl);
        }
      });

      reader.readAsDataURL(file);
    }
  }
};

window.util = {
  escapePressHandler,
  buttonClickHandler,
  Keys,
  debounce,
  fileChooserHandler
};
