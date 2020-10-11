'use strict';

const map = document.querySelector(`.map`);
const mocks = [];
const OFFERS_ROOMS = [`palace`, `flat`, `house`, `bungalow`];
const OFFERS_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const OFFERS_CHECKTIME = [`12:00`, `13:00`, `14:00`];

const randomValue = function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const createRandomArray = function (arrayLength, values) {
  const arrayName = [];
  for (let i = 0; i < randomValue(1, arrayLength); i++) {
    arrayName.push(values[randomValue(0, arrayLength)]);
  }
  return arrayName;
};

map.classList.remove(`map--faded`);

const fragment = document.createDocumentFragment();
const mapPins = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
const mapWidth = mapPins.clientWidth;

for (let i = 0; i < 8; i++) {
  const location = {
    x: randomValue(0, mapWidth),
    y: randomValue(130, 630)
  };
  mocks.push({
    author: {
      avatar: `img/avatars/user0${i + 1}.png`
    },
    offer: {
      title: `предложение ${i + 1}`,
      address: location.x,
      price: 1000,
      type: OFFERS_ROOMS[randomValue(0, OFFERS_ROOMS.length - 1)],
      rooms: randomValue(1, 20),
      guests: randomValue(1, 20),
      checkin: OFFERS_CHECKTIME[randomValue(0, OFFERS_CHECKTIME.length - 1)],
      checkout: OFFERS_CHECKTIME[randomValue(0, OFFERS_CHECKTIME.length - 1)],
      features: createRandomArray(OFFERS_FEATURES.length - 1, OFFERS_FEATURES),
      description: `строка с описанием`,
      photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`]
    },
    location: {
      x: location.x,
      y: location.y
    },
  });
}
const renderPin = function (pin) {
  const pinElement = pinTemplate.cloneNode(true);
  const location = pin.location;
  const locationX = location.x - 25;
  const locationY = location.y - 70;
  const author = pin.author;
  const offer = pin.offer;
  pinElement.style = `left: ${locationX}px; top: ${locationY}px;`;
  pinElement.querySelector(`img`).src = `${author.avatar}`;
  pinElement.querySelector(`img`).alt = `${offer.title}`;
  return pinElement;
};

mocks.forEach(function (mock) {
  fragment.appendChild(renderPin(mock));
});

mapPins.appendChild(fragment);
