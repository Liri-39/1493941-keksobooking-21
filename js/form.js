'use strict';

//  работает с формой объявления

(function () {
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
  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const form = document.querySelector(`.ad-form`);
  const filter = document.querySelector(`.map__filters-container`);
  const allFormFieldset = form.querySelectorAll(`fieldset`);
  const allFilterSelect = filter.querySelectorAll(`select`);
  const priceInput = form.querySelector(`#price`);
  const typeInput = form.querySelector(`#type`);
  const timeoutSelect = form.querySelector(`#timeout`);
  const timeinSelect = form.querySelector(`#timein`);
  const roomNumberSelect = form.querySelector(`#room_number`);
  const capacitySelect = form.querySelector(`#capacity`);

  // действия при загрузке страницы
  /* установка координат в неактивное состоянии*/

  const startCoords = {
    x: mainPin.offsetTop + mainPin.offsetHeight / 2,
    y: mainPin.offsetLeft + +mainPin.offsetWidth / 2
  };
  form.querySelector(`#address`).value = `${Math.round(startCoords.x)}, ${Math.round(startCoords.y)}`;
  priceInput.placeholder = TYPES[typeInput.value].minprice;
  priceInput.min = TYPES[typeInput.value].minprice;
  const setEqualValue = function (firstElement, secondElement) {
    secondElement.value = firstElement.value;
  };
  const setDisableOptions = function () {
    capacitySelect.value = CAPACITY[roomNumberSelect.value][0];
    const capacityOptions = capacitySelect.querySelectorAll(`option`);
    capacityOptions.forEach(function (option) {
      option.disabled = !CAPACITY[roomNumberSelect.value].includes(Number(option.value));
    });
  };
  capacitySelect.value = CAPACITY[roomNumberSelect.value][0];
  setDisableOptions();

  // деактивация
  const formDeactivateHandler = function () {
    allFormFieldset.forEach(function (fieldset) {
      fieldset.disabled = true;
    });
    allFilterSelect.forEach(function (select) {
      select.disabled = true;
    });
    filter.querySelector(`fieldset`).disabled = true;
  };


  // активация
  const formActivateHandler = function () {
    map.classList.remove(`map--faded`);
    form.classList.remove(`ad-form--disabled`);
    allFormFieldset.forEach(function (fieldset) {
      fieldset.disabled = false;
    });
    allFilterSelect.forEach(function (select) {
      select.disabled = false;
    });
    window.page.showPins();
  };

  // меняем плейсхолдер у цены в соответствии с типом
  typeInput.addEventListener(`input`, function () {
    priceInput.min = TYPES[typeInput.value].minprice;
    priceInput.placeholder = TYPES[typeInput.value].minprice;
  });
  // меняем время выезда/заезда
  timeinSelect.addEventListener(`input`, function () {
    setEqualValue(timeinSelect, timeoutSelect);
  });
  timeoutSelect.addEventListener(`input`, function () {
    setEqualValue(timeoutSelect, timeinSelect);
  });
  // меняем количество комнат/гостей
  roomNumberSelect.addEventListener(`input`, function () {
    setDisableOptions();
  });

  window.form = {
    TYPES,
    formActivateHandler,
    formDeactivateHandler
  };
})();
