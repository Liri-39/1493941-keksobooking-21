'use strict';
(function () {
  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);
  mainPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = function (moveEvt) {
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

      if (coordY < 0) {
        coordY = 0;
      } else if (coordY > map.offsetWidth - mainPin.offsetWidth) {
        coordY = map.offsetWidth - mainPin.offsetWidth;
      }

      if (coordX < 130) {
        coordX = 130;
      } else if (coordX > 630) {
        coordX = 630;
      }

      mainPin.style.left = coordY + `px`;
      mainPin.style.top = coordX + `px`;

      document.querySelector(`#address`).value = `${Math.round(coordY + mainPin.offsetWidth / 2)}, ${Math.round(coordX + mainPin.offsetHeight)}`;
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener(`click`, onClickPreventDefault);
        };
        mainPin.addEventListener(`click`, onClickPreventDefault);
      }
    };
    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
