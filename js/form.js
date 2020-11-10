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
  for (let i = 0; i < pins.length; i++) {
    pins[i].remove();
  }
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

// активация
const formActivateHandler = () => {
  window.move.fillAddressValue(startCoords.x, startCoords.y, true);
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
    window.upload(new FormData(form), onSuccess, onError);
    evt.preventDefault();
  });
  fileChooser.addEventListener(`change`, avatarChooserHandler);
  photoChooser.addEventListener(`change`, photoChooserHandler);
  resetButton.addEventListener(`click`, formDeactivateHandler);
};

const onError = () => {
  const messageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const message = messageTemplate.cloneNode(true);
  document.body.insertAdjacentElement(`afterbegin`, message);

  const errorMessage = document.querySelector(`.error`);

  const escapePressHandler = (evt) => {
    if (window.util.Keys.isEscape(evt)) {
      document.removeEventListener(`keydown`, escapePressHandler);
      errorMessage.remove();
    }
  };

  document.addEventListener(`keydown`, escapePressHandler);

  const clickHandler = () => {
    errorMessage.removeEventListener(`click`, clickHandler);
    errorMessage.remove();
  };
  errorMessage.addEventListener(`click`, clickHandler);
};

const onSuccess = () => {
  form.reset();
  formDeactivateHandler();
  removePins();
  const messageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const message = messageTemplate.cloneNode(true);
  document.body.insertAdjacentElement(`afterbegin`, message);

  const successMessage = document.querySelector(`.success`);

  const escapePressHandler = (evt) => {
    if (window.util.Keys.isEscape(evt)) {
      document.removeEventListener(`keydown`, escapePressHandler);
      successMessage.remove();
    }
  };

  document.addEventListener(`keydown`, escapePressHandler);

  const clickHandler = () => {
    successMessage.removeEventListener(`click`, clickHandler);
    successMessage.remove();
  };
  successMessage.addEventListener(`click`, clickHandler);
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
