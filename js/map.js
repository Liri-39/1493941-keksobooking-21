'use strict';

/* управляет карточками объявлений и метками: добавляет на страницу нужную карточку, отрисовывает метки и осуществляет взаимодействие карточки и метки на карте */
(function () {
  const Keys = {
    isEnter(evt) {
      return evt.key === `Enter`;
    },
    isEscape(evt) {
      return evt.key === `Escape`;
    },
  };
  let dataArray = [];
  let MAX_SIMILAR_PINS_COUNT = 5;

  const map = document.querySelector(`.map`);
  const mapPins = document.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();
  const filter = document.querySelector(`.map__filters-container`);

  // добавляет на страницу нужную карточку
  const showCard = function (pin) {
    const activeCard = document.querySelector(`.popup`);
    if (activeCard) {
      closePopup();
    }
    const cardElement = window.card.renderCard(pin);
    map.insertBefore(cardElement, filter);
    const buttonCloseCard = map.querySelector(`.popup__close`);
    buttonCloseCard.addEventListener(`click`, buttonClickHandler);
    document.addEventListener(`keydown`, escapePressHandler);
  };

  const updatePins = () => {
    dataArray = window.sortDataArray(dataArray);
    if (dataArray.length < 5) {
      MAX_SIMILAR_PINS_COUNT = dataArray.length;
    }
    for (let i = 0; i < MAX_SIMILAR_PINS_COUNT; i++) {
      const pin = window.pins.renderPin(dataArray[i]);
      fragment.appendChild(pin);
      pin.addEventListener(`click`, function () {
        showCard(dataArray[i]);
      });
      pin.addEventListener(`keydown`, function (evt) {
        if (Keys.isEnter(evt)) {
          showCard(dataArray[i]);
        }
      });
    }
    mapPins.appendChild(fragment);
  };

  const successHandler = function (objects) {
    dataArray = objects;
    updatePins();
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; color: wheat;`;
    node.style.fontSize = `30px`;
    node.classList.add(`error`);
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  // отрисовывает метки
  const showPins = function () {
    window.loadData(successHandler, errorHandler);
  };

  const escapePressHandler = function (evt) {
    if (Keys.isEscape(evt)) {
      closePopup();
    }
  };
  const buttonClickHandler = function () {
    closePopup();
  };

  const removeCard = () => {
    const card = map.querySelector(`.popup`);
    if (card) {
      map.removeChild(card);
    }
  };
  const closePopup = function () {
    document.removeEventListener(`keydown`, escapePressHandler);
    const buttonCloseCard = map.querySelector(`.popup__close`);
    buttonCloseCard.removeEventListener(`click`, buttonClickHandler);
    removeCard();
  };

  window.page = {
    showPins,
    Keys,
    removeCard,
    dataArray
  };
})();
