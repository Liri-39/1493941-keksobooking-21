'use strict';

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);


const renderElement = (pin) => {
  const pinElement = pinTemplate.cloneNode(true);
  const location = pin.location;
  const locationX = location.x - PIN_WIDTH / 2;
  const locationY = location.y - PIN_HEIGHT;
  const author = pin.author;
  const offer = pin.offer;
  pinElement.style = `left: ${locationX}px; top: ${locationY}px;`;
  pinElement.querySelector(`img`).src = `${author.avatar}`;
  pinElement.querySelector(`img`).alt = `${offer.title}`;
  return pinElement;
};
window.pins = {
  renderElement
};
