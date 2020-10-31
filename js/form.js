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
  const resetButton = document.querySelector(`.ad-form__reset`);

  // действия при загрузке страницы

  /* установка  координат в неактивном состоянии*/

  const startCoords = {
    y: mainPin.offsetTop,
    x: mainPin.offsetLeft
  };
  form.querySelector(`#address`).value = `${Math.round(startCoords.x + mainPin.offsetHeight / 2)}, ${Math.round(startCoords.y + mainPin.offsetWidth / 2)}`;

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
    map.classList.add(`map--faded`);
    form.classList.add(`ad-form--disabled`);
    capacitySelect.value = CAPACITY[roomNumberSelect.value][0];
    setDisableOptions();
    form.querySelector(`#address`).value = `${Math.round(startCoords.x + mainPin.offsetHeight / 2)}, ${Math.round(startCoords.y + mainPin.offsetWidth / 2)}`;
    allFormFieldset.forEach(function (fieldset) {
      fieldset.disabled = true;
    });
    allFilterSelect.forEach(function (select) {
      select.disabled = true;
    });
    filter.querySelector(`fieldset`).disabled = true;
  };

  resetButton.addEventListener(`click`, formDeactivateHandler);

  // активация
  const formActivateHandler = function () {
    form.querySelector(`#address`).value = window.move.fillAddressValue(startCoords.x, startCoords.y);
    map.classList.remove(`map--faded`);
    form.classList.remove(`ad-form--disabled`);
    allFormFieldset.forEach(function (fieldset) {
      fieldset.disabled = false;
    });
    allFilterSelect.forEach(function (select) {
      select.disabled = false;
    });
    window.page.showPins();
    form.addEventListener(`submit`, function (evt) {
      window.upload(new FormData(form), onSuccess, onError);
      evt.preventDefault();
    });
  };

  const onError = function () {
    const messageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
    const message = messageTemplate.cloneNode(true);
    document.body.insertAdjacentElement(`afterbegin`, message);

    const errorMessage = document.querySelector(`.error`);

    const escapePressHandler = function (evt) {
      if (window.page.Keys.isEscape(evt)) {
        document.removeEventListener(`keydown`, escapePressHandler);
        errorMessage.remove();
      }
    };

    document.addEventListener(`keydown`, escapePressHandler);

    const clickHandler = function () {
      document.removeEventListener(`click`, clickHandler);
      errorMessage.remove();
    };
    errorMessage.addEventListener(`click`, clickHandler);
  };

  const onSuccess = function () {
    form.reset();
    formDeactivateHandler();
    const pins = map.querySelectorAll(`.map__pin:not(:first-of-type)`);
    for (let i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
    const messageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
    const message = messageTemplate.cloneNode(true);
    document.body.insertAdjacentElement(`afterbegin`, message);

    const successMessage = document.querySelector(`.success`);

    const escapePressHandler = function (evt) {
      if (window.page.Keys.isEscape(evt)) {
        document.removeEventListener(`keydown`, escapePressHandler);
        successMessage.remove();
      }
    };

    document.addEventListener(`keydown`, escapePressHandler);

    const clickHandler = function () {
      document.removeEventListener(`click`, clickHandler);
      successMessage.remove();
    };
    successMessage.addEventListener(`click`, clickHandler);
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
