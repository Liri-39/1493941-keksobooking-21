'use strict';

(function () {
  let dataArray = [];
  let MAX_SIMILAR_PINS_COUNT = 5;
  const map = document.querySelector(`.map`);
  const mapPins = document.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();
  const filter = document.querySelector(`.map__filters-container`);
  const filters = document.querySelector(`.map__filters`);

  const showCard = function (pin) {
    const activeCard = document.querySelector(`.popup`);
    if (activeCard) {
      closePopup();
    }
    const cardElement = window.card.renderCard(pin);
    map.insertBefore(cardElement, filter);
    const buttonCloseCard = map.querySelector(`.popup__close`);
    buttonCloseCard.addEventListener(`click`, window.util.buttonClickHandler);
    document.addEventListener(`keydown`, window.util.escapePressHandler);
  };

  const updatePins = (arr) => {
    let newDataArray = window.filter.sortDataArray(arr);
    let PINS_COUNT = MAX_SIMILAR_PINS_COUNT;
    if (newDataArray.length < MAX_SIMILAR_PINS_COUNT) {
      PINS_COUNT = newDataArray.length;
    }
    newDataArray = newDataArray.slice(0, PINS_COUNT);
    newDataArray.forEach((arrayItem) => {
      const pin = window.pins.renderPin(arrayItem);
      fragment.appendChild(pin);
      pin.addEventListener(`click`, function () {
        showCard(arrayItem);
      });
      pin.addEventListener(`keydown`, function (evt) {
        if (window.util.Keys.isEnter(evt)) {
          showCard(arrayItem);
        }
      });
    });
    mapPins.appendChild(fragment);
  };

  const successHandler = function (objects) {
    dataArray = objects;
    updatePins(dataArray);
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; color: wheat;`;
    node.style.fontSize = `30px`;
    node.classList.add(`error`);
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const showPins = function () {
    window.loadData(successHandler, errorHandler);
  };

  const removeCard = () => {
    const card = map.querySelector(`.popup`);
    if (card) {
      map.removeChild(card);
    }
  };
  const closePopup = function () {
    document.removeEventListener(`keydown`, window.util.escapePressHandler);
    const buttonCloseCard = map.querySelector(`.popup__close`);
    buttonCloseCard.removeEventListener(`click`, window.util.buttonClickHandler);
    removeCard();
  };

  const changeFilterHandler = function () {
    window.debounce.debounce(showPins());
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
})();
