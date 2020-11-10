'use strict';

const form = document.querySelector(`.ad-form`);
const coordLimits = {
  minY: 0,
  minX: 130,
  maxX: 630
};
const fillAddressValue = (x, y, isDragged) => {
  let xOffset = mainPin.offsetHeight / 2;
  if (isDragged) {
    xOffset = mainPin.offsetHeight;
  }
  form.querySelector(`#address`).value = `${Math.round(y + mainPin.offsetWidth / 2)}, ${Math.round(x + xOffset)}`;
};
const map = document.querySelector(`.map`);
const mainPin = map.querySelector(`.map__pin--main`);
mainPin.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  let dragged = false;

  const mouseMoveHandler = (moveEvt) => {
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

    fillAddressValue(coordX, coordY, true);
  };

  const mouseUpHandler = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, mouseMoveHandler);
    document.removeEventListener(`mouseup`, mouseUpHandler);

    if (dragged) {
      const onClickPreventDefault = (clickEvt) => {
        clickEvt.preventDefault();
        mainPin.removeEventListener(`click`, onClickPreventDefault);
      };
      mainPin.addEventListener(`click`, onClickPreventDefault);
    }
  };
  document.addEventListener(`mousemove`, mouseMoveHandler);
  document.addEventListener(`mouseup`, mouseUpHandler);
});
window.move = {
  fillAddressValue
};
