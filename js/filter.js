'use strict';

const filters = document.querySelector(`.map__filters`);
const MAX_SIMILAR_PINS_COUNT = 5;

const filteredDataArray = (dataArray) => {

  const filterValueArray = {
    type: filters.querySelector(`#housing-type`).value,
    price: filters.querySelector(`#housing-price`).value,
    rooms: filters.querySelector(`#housing-rooms`).value,
    guests: filters.querySelector(`#housing-guests`).value,
    features: Array.from(filters.querySelectorAll(`.map__checkbox:checked`)).map((cb) => cb.value),
  };
  const FilterOfferPrice = {
    priceMin: 10000,
    priceMax: 50000
  };

  let array = [];

  for (let i = 0; i < dataArray.length; i++) {

    let isFiltered = true;
    switch (isFiltered) {
      case (dataArray[i].offer.type !== filterValueArray.type && filterValueArray.type !== `any`):
        isFiltered = false;
        break;
      case (dataArray[i].offer.rooms !== Number(filterValueArray.rooms) && filterValueArray.rooms !== `any`):
        isFiltered = false;
        break;
      case (dataArray[i].offer.guests !== Number(filterValueArray.guests) && filterValueArray.guests !== `any`):
        isFiltered = false;
        break;
      case (dataArray[i].offer.price >= FilterOfferPrice.priceMin && filterValueArray.price === `low`):
        isFiltered = false;
        break;
      case (dataArray[i].offer.price <= FilterOfferPrice.priceMax && filterValueArray.price === `high`):
        isFiltered = false;
        break;
      case ((dataArray[i].offer.price < FilterOfferPrice.priceMin || dataArray[i].offer.price > FilterOfferPrice.priceMax) && filterValueArray.price === `middle`):
        isFiltered = false;
        break;

      case (dataArray[i].offer.features !== filterValueArray.features && filterValueArray.features.length !== 0):
        filterValueArray.features.forEach((feature) => {
          if (!dataArray[i].offer.features.includes(feature)) {
            isFiltered = false;
          }
        });
        break;
    }
    if (isFiltered === true) {
      array.push(dataArray[i]);
    }
    if (array.length === MAX_SIMILAR_PINS_COUNT) {
      break;
    }
  }

  return array;
};
window.filter = {
  filteredDataArray
};
