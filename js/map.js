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
      const cardElement = window.card.renderCard(pin);
      map.insertBefore(cardElement, filter);
      const buttonCloseCard = map.querySelector(`.popup__close`);
      buttonCloseCard.addEventListener(`click`, buttonClickHandler);
      document.addEventListener(`keydown`, escapePressHandler);
    };

    // отрисовывает метки
    const showPins = function () {
      window.data.mocks.forEach(function (mock) {
        const pin = window.pins.renderPin(mock);
        fragment.appendChild(pin);
        pin.addEventListener(`click`, function () {
          showCard(mock);
        });
        pin.addEventListener(`keydown`, function (evt) {
          if (Keys.isEnter(evt)) {
            showCard(mock);
          }
        });
        pin.addEventListener('mousedown', function (evt) {
          evt.preventDefault();

          var startCoords = {
            x: evt.clientX,
            y: evt.clientY
          };

          var dragged = false;

          var onMouseMove = function (moveEvt) {
            moveEvt.preventDefault();

            dragged = true;

            var shift = {
              x: startCoords.x - moveEvt.clientX,
              y: startCoords.y - moveEvt.clientY
            };

            startCoords = {
              x: moveEvt.clientX,
              y: moveEvt.clientY
            };

            pin.style.top = (pin.offsetTop - shift.y) + 'px';
            pin.style.left = (pin.offsetLeft - shift.x) + 'px';

          };

          var onMouseUp = function (upEvt) {
            upEvt.preventDefault();

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            if (dragged) {
              var onClickPreventDefault = function (clickEvt) {
                clickEvt.preventDefault();
                pin.removeEventListener('click', onClickPreventDefault)
              };
              pin.addEventListener('click', onClickPreventDefault);
            }
          };

          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
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
