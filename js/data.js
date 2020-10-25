'use strict';
// создаёт данные

(function () {
  const mocks = [];
  const mapPins = document.querySelector(`.map__pins`);
  const MAX_VALUE_Y = 630;
  const MIN_VALUE_Y = 130;
  const MAX_VALUE_ARRAY = 10;
  const mapWidth = mapPins.clientWidth;
  const MOCKS_LENGTH = 8;
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

  window.data = {
    mocks,
    randomValue,
    createRandomArray
  };
})();
