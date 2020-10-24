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
    const cardElement = card.renderCard(pin);
    map.insertBefore(cardElement, filter);
    const buttonCloseCard = map.querySelector(`.popup__close`);
    buttonCloseCard.addEventListener(`click`, buttonClickHandler);
    document.addEventListener(`keydown`, escapePressHandler);
  };

  // отрисовывает метки
  const showPins = function () {
    data.mocks.forEach(function (mock) {
      const pin = pins.renderPin(mock);
      fragment.appendChild(pin);
      pin.addEventListener(`click`, function () {
        showCard(mock);
      });
      pin.addEventListener(`keydown`, function (evt) {
        if (Keys.isEnter(evt)) {
          showCard(mock);
        }
      });
    });
    mapPins.appendChild(fragment);
  };

  const escapePressHandler = function (evt) {
    if (Keys.isEscape(evt)) {
      closePopup();
    }
  };
  const buttonClickHandler = function () {
    closePopup();
  };

  const closePopup = function () {
    document.removeEventListener(`keydown`, escapePressHandler);
    const buttonCloseCard = map.querySelector(`.popup__close`);
    buttonCloseCard.removeEventListener(`click`, buttonClickHandler);
    const card = map.querySelector(`.popup`);
    if (card) {
      map.removeChild(card);
    }
  };

  window.page = {
    showPins,
    Keys
  };
})();
