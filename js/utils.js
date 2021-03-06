'use strict';

const Keys = {
  isEnter(evt) {
    return evt.key === `Enter`;
  },
  isEscape(evt) {
    return evt.key === `Escape`;
  },
};
const Buttons = {
  isLeft(evt) {
    return evt.button === 0;
  }
};
const DEBOUNCE_INTERVAL = 500;
let lastTimeout;
const escapePressHandler = (evt) => {
  if (Keys.isEscape(evt)) {
    window.page.closePopup();
  }
};
const buttonClickHandler = () => {
  window.page.closePopup();
};

const debounce = (cb) => {
  if (lastTimeout) {
    clearTimeout(lastTimeout);
  }
  lastTimeout = setTimeout(cb, DEBOUNCE_INTERVAL);
};

const chooseFile = (firstElement, secondElement, isAvatar = true) => {

  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  if (firstElement.files.length) {
    const file = firstElement.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        if (isAvatar) {
          secondElement.src = reader.result;
        } else {
          const imgEl = document.createElement(`img`);
          imgEl.src = reader.result;
          imgEl.width = secondElement.offsetWidth;
          imgEl.height = secondElement.offsetHeight;
          secondElement.appendChild(imgEl);
        }
      });

      reader.readAsDataURL(file);
    }
  }
};

const removeElement = (evt, element, cb) => {

  if (evt.type === `keydown`) {
    if (Keys.isEscape(evt)) {
      document.removeEventListener(`keydown`, cb);
    }
  } else if (evt.type === `click`) {
    document.removeEventListener(`click`, cb);
  }

  element.remove();
};

window.util = {
  escapePressHandler,
  buttonClickHandler,
  Keys,
  Buttons,
  debounce,
  chooseFile,
  removeElement
};
