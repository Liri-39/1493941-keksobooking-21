'use strict';
const PIN_TAIL = 22;
const form = document.querySelector(`.ad-form`);

const coordLimits = {
  minX: 0,
  minY: 130,
  maxY: 630
};
const fillAddressValue = (x, y, isDragged) => {

  let yOffset = mainPin.offsetHeight / 2;
  const xOffset = mainPin.offsetWidth / 2;

  if (isDragged) {
    yOffset = mainPin.offsetHeight + PIN_TAIL;
  }
  form.querySelector(`#address`).value = `${Math.round(x + xOffset)}, ${Math.round(y + yOffset)}`;
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

    let coordX = mainPin.offsetLeft - shift.x;
    let coordY = mainPin.offsetTop - shift.y;
    if (coordY < coordLimits.minY - mainPin.offsetHeight - PIN_TAIL) {
      coordY = coordLimits.minY - mainPin.offsetHeight - PIN_TAIL;
    } else if (coordY > coordLimits.maxY - mainPin.offsetHeight - PIN_TAIL) {
      coordY = coordLimits.maxY - mainPin.offsetHeight - PIN_TAIL;
    }

    if (coordX < coordLimits.minX - mainPin.offsetWidth / 2) {
      coordX = coordLimits.minX - mainPin.offsetWidth / 2;
    } else if (coordX > map.offsetWidth - mainPin.offsetWidth / 2) {
      coordX = map.offsetWidth - mainPin.offsetWidth / 2;
    }

    mainPin.style.left = coordX + `px`;
    mainPin.style.top = coordY + `px`;

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
