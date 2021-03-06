'use strict';

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
const allfilterCheckbox = filter.querySelectorAll(`.map__checkbox`);
const priceInput = form.querySelector(`#price`);
const typeInput = form.querySelector(`#type`);
const timeoutSelect = form.querySelector(`#timeout`);
const timeinSelect = form.querySelector(`#timein`);
const roomNumberSelect = form.querySelector(`#room_number`);
const capacitySelect = form.querySelector(`#capacity`);
const resetButton = form.querySelector(`.ad-form__reset`);
const fileChooser = form.querySelector(`.ad-form__field input[type=file]`);
const preview = form.querySelector(`.ad-form-header__preview img`);
const previewDefaultSrc = preview.src;
const photoChooser = form.querySelector(`.ad-form__upload input[type=file]`);
const photoPreview = form.querySelector(`.ad-form__photo`);
const avatarChooserHandler = () => {
  window.util.chooseFile(fileChooser, preview);
};
const photoChooserHandler = () => {
  window.util.chooseFile(photoChooser, photoPreview, false);
};

const startCoords = {
  y: mainPin.offsetTop,
  x: mainPin.offsetLeft
};
window.move.fillAddressValue(startCoords.x, startCoords.y, false);

priceInput.placeholder = TYPES[typeInput.value].minprice;
priceInput.min = TYPES[typeInput.value].minprice;
const setEqualValue = (firstElement, secondElement) => {
  secondElement.value = firstElement.value;
};
const setDisableOptions = () => {
  capacitySelect.value = CAPACITY[roomNumberSelect.value][0];
  const capacityOptions = capacitySelect.querySelectorAll(`option`);
  capacityOptions.forEach((option) => {
    option.disabled = !CAPACITY[roomNumberSelect.value].includes(Number(option.value));
  });
};
capacitySelect.value = CAPACITY[roomNumberSelect.value][0];
setDisableOptions();

const removePins = () => {
  const pins = map.querySelectorAll(`.map__pin:not(:first-of-type)`);
  pins.forEach((pin) => {
    pin.remove();
  });
};

// деактивация
const formDeactivateHandler = () => {
  map.classList.add(`map--faded`);
  form.classList.add(`ad-form--disabled`);
  capacitySelect.value = CAPACITY[roomNumberSelect.value][0];
  setDisableOptions();
  window.move.fillAddressValue(startCoords.x, startCoords.y, false);
  mainPin.style.left = startCoords.x + `px`;
  mainPin.style.top = startCoords.y + `px`;
  allFormFieldset.forEach((fieldset) => {
    fieldset.disabled = true;
  });
  allFilterSelect.forEach((select) => {
    select.disabled = true;
    select.selectedIndex = 0;
  });
  allfilterCheckbox.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.disabled = true;
  });
  removePins();
  const activeCard = document.querySelector(`.popup`);
  if (activeCard) {
    window.page.closePopup();
  }
  fileChooser.removeEventListener(`change`, avatarChooserHandler);
  photoChooser.removeEventListener(`change`, photoChooserHandler);
  photoPreview.innerHTML = ``;
  preview.src = previewDefaultSrc;
};

const formActivateHandler = (evt) => {
  if (window.util.Buttons.isLeft(evt) || window.util.Keys.isEnter(evt)) {
    activate();
  }
};

// активация
const activate = () => {
  mainPin.style = `left: ${startCoords.x}px; top: ${startCoords.y - window.move.PIN_TAIL - mainPin.offsetHeight / 2}px;`;
  map.classList.remove(`map--faded`);
  form.classList.remove(`ad-form--disabled`);
  allFormFieldset.forEach((fieldset) => {
    fieldset.disabled = false;
  });
  allFilterSelect.forEach((select) => {
    select.disabled = false;
  });
  allfilterCheckbox.forEach((checkbox) => {
    checkbox.disabled = false;
  });
  window.page.showPins();
  form.addEventListener(`submit`, (evt) => {
    window.load(onSuccess, onError, new FormData(form));
    evt.preventDefault();
  });
  fileChooser.addEventListener(`change`, avatarChooserHandler);
  photoChooser.addEventListener(`change`, photoChooserHandler);
  resetButton.addEventListener(`click`, formDeactivateHandler);
  mainPin.removeEventListener(`mousedown`, window.form.formActivateHandler);
  mainPin.removeEventListener(`keydown`, window.form.formActivateHandler);
};

const onError = () => {
  const messageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const message = messageTemplate.cloneNode(true);

  document.body.insertAdjacentElement(`afterbegin`, message);

  const errorMessage = document.querySelector(`.error`);
  const closeMessageHandler = (evt) => {
    window.util.removeElement(evt, errorMessage, closeMessageHandler);
  };
  document.addEventListener(`keydown`, closeMessageHandler);
  errorMessage.addEventListener(`click`, closeMessageHandler);
};

const onSuccess = () => {
  const messageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const message = messageTemplate.cloneNode(true);

  form.reset();
  formDeactivateHandler();
  removePins();
  document.body.insertAdjacentElement(`afterbegin`, message);
  const successMessage = document.querySelector(`.success`);
  const closeMessageHandler = (evt) => {
    window.util.removeElement(evt, successMessage, closeMessageHandler);
  };
  document.addEventListener(`keydown`, closeMessageHandler);
  successMessage.addEventListener(`click`, closeMessageHandler);
};


typeInput.addEventListener(`input`, () => {
  priceInput.min = TYPES[typeInput.value].minprice;
  priceInput.placeholder = TYPES[typeInput.value].minprice;
});

timeinSelect.addEventListener(`input`, () => {
  setEqualValue(timeinSelect, timeoutSelect);
});
timeoutSelect.addEventListener(`input`, () => {
  setEqualValue(timeoutSelect, timeinSelect);
});

roomNumberSelect.addEventListener(`input`, () => {
  setDisableOptions();
});

window.form = {
  TYPES,
  formActivateHandler,
  formDeactivateHandler,
  removePins
};
