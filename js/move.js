'use strict';
(function () {
  const coordLimits = {
    minY: 0,
    minX: 130,
    maxX: 630
  };
  const addressValue = function (x, y) {
    const coord = `${Math.round(y + mainPin.offsetWidth / 2)}, ${Math.round(x + mainPin.offsetHeight)}`;
    return coord;
  };
  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);
  mainPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const MouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let coordY = mainPin.offsetLeft - shift.x;
      let coordX = mainPin.offsetTop - shift.y;

      if (coordY < coordLimits.minY) {
        coordY = coordLimits.minY;
      } else if (coordY > map.offsetWidth - mainPin.offsetWidth) {
        coordY = map.offsetWidth - mainPin.offsetWidth;
      }

      if (coordX < coordLimits.minX) {
        coordX = coordLimits.minX;
      } else if (coordX > coordLimits.maxX) {
        coordX = coordLimits.maxX;
      }

      mainPin.style.left = coordY + `px`;
      mainPin.style.top = coordX + `px`;

      document.querySelector(`#address`).value = addressValue(coordX, coordY);
    };

    const MouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, MouseMoveHandler);
      document.removeEventListener(`mouseup`, MouseUpHandler);

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener(`click`, onClickPreventDefault);
        };
        mainPin.addEventListener(`click`, onClickPreventDefault);
      }
    };
    document.addEventListener(`mousemove`, MouseMoveHandler);
    document.addEventListener(`mouseup`, MouseUpHandler);
  });
  window.move = {
    addressValue
  };
})();
