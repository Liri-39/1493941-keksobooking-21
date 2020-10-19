'use strict';
const CARD_PHOTO_WIDTH = 45;
const CARD_PHOTO_HEIGHT = 40;
const MOCKS_LENGTH = 8;
const MAX_VALUE_Y = 630;
const MIN_VALUE_Y = 130;
const MAX_VALUE_ARRAY = 10;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const map = document.querySelector(`.map`);
const mainPin = document.querySelector(`.map__pin--main`);
const mocks = [];
const filter = document.querySelector(`.map__filters-container`);
const form = document.querySelector(`.ad-form`);
const allFormFieldset = form.querySelectorAll(`fieldset`);
const allFilterSelect = filter.querySelectorAll(`select`);
const titleInput = form.querySelector(`#title`);
const priceInput = form.querySelector(`#price`);
const typeInput = form.querySelector(`#type`);
const timeoutSelect = form.querySelector(`#timeout`);
const timeinSelect = form.querySelector(`#timein`);
const roomNumberSelect = form.querySelector(`#room_number`);
const capacitySelect = form.querySelector(`#capacity`);

const OFFERS = {
  ROOMS: [`palace`, `flat`, `house`, `bungalow`],
  FEATURES: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
  CHECKTIME: [`12:00`, `13:00`, `14:00`]
};
const TYPES = {
  house: {
    name: `дом`,
    minprice: 5000
  },
  flat: {
    name: `квартира`,
    minprice: 1000
  },
  palace: {
    name: `дворец`,
    minprice: 10000
  },
  bungalow: {
    name: `бунгало`,
    minprice: 0
  }
};
const CAPACITY = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
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

/* создание моков*/

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

/* валидация формы*/
// задаем ограничения по количеству символов для заголовка
titleInput.min = MIN_NAME_LENGTH;
titleInput.max = MAX_NAME_LENGTH;

// меняем плейсхолдер у цены в соответствии с типом
typeInput.addEventListener(`input`, function () {
  priceInput.min = TYPES[typeInput.value].minprice;
  priceInput.placeholder = TYPES[typeInput.value].minprice;
});
priceInput.placeholder = TYPES[typeInput.value].minprice;
priceInput.min = TYPES[typeInput.value].minprice;

// меняем время выезда/заезда

const setEqualValue = function (firstElement, secondElement) {
  secondElement.value = firstElement.value;
};

timeinSelect.addEventListener(`input`, function () {
  setEqualValue(timeinSelect, timeoutSelect);
});
timeoutSelect.addEventListener(`input`, function () {
  setEqualValue(timeoutSelect, timeinSelect);
});

// меняем количество комнат/гостей
const setDisableOptions = function () {
  capacitySelect.value = CAPACITY[roomNumberSelect.value][0];
  const capacityOptions = capacitySelect.querySelectorAll(`option`);
  capacityOptions.forEach(function (option) {
    option.disabled = !CAPACITY[roomNumberSelect.value].includes(Number(option.value));
  });
};

capacitySelect.value = CAPACITY[roomNumberSelect.value][0];
setDisableOptions();
roomNumberSelect.addEventListener(`input`, function () {
  setDisableOptions();
});

/* создание карты объявления*/

const renderCard = function (card) {
  const cardElement = cardTemplate.cloneNode(true);
  const offer = card.offer;
  const author = card.author;
  const featuresArray = offer.features;
  const photosArray = offer.photos;
  cardElement.querySelector(`.popup__title`).textContent = `${offer.title}`;
  cardElement.querySelector(`.popup__text--address`).textContent = `${offer.address}`;
  cardElement.querySelector(`.popup__text--price`).textContent = `${offer.price}₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = TYPES[offer.type][name];
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featuresList = cardElement.querySelector(`.popup__features`);
  featuresList.innerHTML = ``;
  for (let i = 0; i < featuresArray.length; i++) {
    const feature = document.createElement(`li`);
    feature.className = `popup__feature popup__feature--${offer.features[i]}`;
    featuresList.appendChild(feature);
  }

  cardElement.querySelector(`.popup__description`).textContent = `${offer.description}`;

  const photosList = cardElement.querySelector(`.popup__photos`);
  photosList.innerHTML = ``;
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

/* создание меток объявлений*/

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

/* неактивное состояние */

allFormFieldset.forEach(function (fieldset) {
  fieldset.disabled = true;
});
allFilterSelect.forEach(function (select) {
  select.disabled = true;
});
filter.querySelector(`fieldset`).disabled = true;

/* установка координат в неактивном состоянии*/

const startCoords = {
  x: mainPin.offsetTop + mainPin.offsetHeight / 2,
  y: mainPin.offsetLeft + +mainPin.offsetWidth / 2
};
form.querySelector(`#address`).value = `${Math.round(startCoords.x)}, ${Math.round(startCoords.y)}`;

/* активация */

const formActivateHandler = function () {
  map.classList.remove(`map--faded`);
  form.classList.remove(`ad-form--disabled`);
  filter.querySelector(`fieldset`).disabled = false;
  allFormFieldset.forEach(function (fieldset) {
    fieldset.disabled = false;
  });
  allFilterSelect.forEach(function (select) {
    select.disabled = false;
  });
  mocks.forEach(function (mock) {
    fragment.appendChild(renderPin(mock));
  });
  mapPins.appendChild(fragment);
  map.insertBefore(renderCard(mocks[0]), filter);
};

mainPin.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    formActivateHandler();
  }
});
mainPin.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    formActivateHandler();
  }
});
