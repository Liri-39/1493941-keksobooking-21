'use strict';

let dataArray = [];
const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);
const fragment = document.createDocumentFragment();
const filter = document.querySelector(`.map__filters-container`);
const filters = document.querySelector(`.map__filters`);

const showCard = (pin) => {
  const activeCard = document.querySelector(`.popup`);
  if (activeCard) {
    closePopup();
  }
  const cardElement = window.card.renderElement(pin);
  map.insertBefore(cardElement, filter);
  const buttonCloseCard = map.querySelector(`.popup__close`);
  buttonCloseCard.addEventListener(`click`, window.util.buttonClickHandler);
  document.addEventListener(`keydown`, window.util.escapePressHandler);
};

const updatePins = (arr) => {

  let newDataArray = window.filter.getfilteredDataArray(arr);
  let pinsCount = window.filter.MAX_SIMILAR_PINS_COUNT;
  if (newDataArray.length < window.filter.MAX_SIMILAR_PINS_COUNT) {
    pinsCount = newDataArray.length;
  }
  newDataArray = newDataArray.slice(0, pinsCount);
  newDataArray.forEach((arrayItem) => {
    const pin = window.pins.renderElement(arrayItem);
    fragment.appendChild(pin);
    pin.addEventListener(`click`, () => {
      showCard(arrayItem);
    });
    pin.addEventListener(`keydown`, (evt) => {
      if (window.util.Keys.isEnter(evt)) {
        showCard(arrayItem);
      }
    });
  });
  mapPins.appendChild(fragment);
};

const successHandler = (objects) => {
  dataArray = objects;
  const data = objects.length > window.filter.MAX_SIMILAR_PINS_COUNT ? objects.slice(0, window.filter.MAX_SIMILAR_PINS_COUNT) : objects;
  updatePins(data);
};

const errorHandler = (errorMessage) => {
  const MESSAGE_STYLE = `z-index: 100; color: wheat; font-size: 30px`;
  const node = document.createElement(`div`);
  node.style.cssText = MESSAGE_STYLE;
  node.classList.add(`error`);
  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const showPins = () => {
  window.load(successHandler, errorHandler);
};

const removeCard = () => {
  const card = map.querySelector(`.popup`);
  if (card) {
    map.removeChild(card);
  }
};
const closePopup = () => {
  document.removeEventListener(`keydown`, window.util.escapePressHandler);
  const buttonCloseCard = map.querySelector(`.popup__close`);
  buttonCloseCard.removeEventListener(`click`, window.util.buttonClickHandler);
  removeCard();
};

const changeFilterHandler = () => {
  window.util.debounce(() => {
    updatePins(dataArray);
  });
  window.form.removePins();
  removeCard();
};

filters.addEventListener(`change`, changeFilterHandler);

window.page = {
  showPins,
  removeCard,
  dataArray,
  successHandler,
  updatePins,
  closePopup
};
