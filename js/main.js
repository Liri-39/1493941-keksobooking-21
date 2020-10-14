'use strict';
const CARD_PHOTO_WIDTH = 45;
const CARD_PHOTO_HEIGHT = 40;
const MOCKS_LENGTH = 8;
const MAX_VALUE_Y = 630;
const MIN_VALUE_Y = 130;
const MAX_VALUE_ARRAY = 10;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const map = document.querySelector(`.map`);
const mocks = [];
const filter = document.querySelector(`.map__filters-container`);
const OFFERS = {
  ROOMS: [`palace`, `flat`, `house`, `bungalow`],
  FEATURES: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
  CHECKTIME: [`12:00`, `13:00`, `14:00`]
};
const randomValue = function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const createRandomArray = function (arrayLength, values) {
  const newArray = [];
  for (let i = 0; i < randomValue(1, arrayLength); i++) {
    newArray.push(values[randomValue(0, arrayLength)]);
  }
  return newArray;
};

const fragment = document.createDocumentFragment();
const mapPins = document.querySelector(`.map__pins`);

const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);

const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

const mapWidth = mapPins.clientWidth;

for (let i = 0; i < MOCKS_LENGTH; i++) {
  const location = {
    x: randomValue(0, mapWidth),
    y: randomValue(MIN_VALUE_Y, MAX_VALUE_Y)
  };
  mocks.push({
    author: {
      avatar: `img/avatars/user0${i + 1}.png`
    },
    offer: {
      title: `предложение ${i + 1}`,
      address: `${location.x}, ${location.y}`,
      price: 1000,
      type: OFFERS.ROOMS[randomValue(0, OFFERS.ROOMS.length - 1)],
      rooms: randomValue(1, MAX_VALUE_ARRAY),
      guests: randomValue(1, MAX_VALUE_ARRAY),
      checkin: OFFERS.CHECKTIME[randomValue(0, OFFERS.CHECKTIME.length - 1)],
      checkout: OFFERS.CHECKTIME[randomValue(0, OFFERS.CHECKTIME.length - 1)],
      features: createRandomArray(OFFERS.FEATURES.length - 1, OFFERS.FEATURES),
      description: `строка с описанием`,
      photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`]
    },
    location: {
      x: location.x,
      y: location.y
    },
  });
}

const renderCard = function (card) {
  const cardElement = cardTemplate.cloneNode(true);
  const offer = card.offer;
  const author = card.author;
  const featuresArray = offer.features;
  const photosArray = offer.photos;
  cardElement.querySelector(`.popup__title`).textContent = `${offer.title}`;
  cardElement.querySelector(`.popup__text--address`).textContent = `${offer.address}`;
  cardElement.querySelector(`.popup__text--price`).textContent = `${offer.price}₽/ночь`;

  if (offer.type === `house`) {
    cardElement.querySelector(`.popup__type`).textContent = `дом`;
  } else if (offer.type === `flat`) {
    cardElement.querySelector(`.popup__type`).textContent = `квартира`;
  } else if (offer.type === `palace`) {
    cardElement.querySelector(`.popup__type`).textContent = `дворец`;
  } else {
    cardElement.querySelector(`.popup__type`).textContent = `бунгало`;
  }

  cardElement.querySelector(`.popup__text--capacity`).textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featuresList = cardElement.querySelector(`.popup__features`);
  while (featuresList.firstChild) {
    featuresList.removeChild(featuresList.firstChild);
  }
  for (let i = 0; i < featuresArray.length; i++) {
    const feature = document.createElement(`li`);
    feature.className = `popup__feature popup__feature--${offer.features[i]}`;
    featuresList.appendChild(feature);
  }

  cardElement.querySelector(`.popup__description`).textContent = `${offer.description}`;

  const photosList = cardElement.querySelector(`.popup__photos`);
  while (photosList.firstChild) {
    photosList.removeChild(photosList.firstChild);
  }
  for (let i = 0; i < photosArray.length; i++) {
    const photo = document.createElement(`img`);
    photo.className = `popup__photo`;
    photo.src = `${photosArray[i]}`;
    photo.alt = `${offer.title}`;
    photo.width = `${CARD_PHOTO_WIDTH}`;
    photo.height = `${CARD_PHOTO_HEIGHT}`;
    photosList.appendChild(photo);
  }

  cardElement.querySelector(`.popup__avatar`).src = `${author.avatar}`;
  return cardElement;
};

const renderPin = function (pin) {
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

map.classList.remove(`map--faded`);
mocks.forEach(function (mock) {
  fragment.appendChild(renderPin(mock));
});
mapPins.appendChild(fragment);
map.insertBefore(renderCard(mocks[0]), filter);
