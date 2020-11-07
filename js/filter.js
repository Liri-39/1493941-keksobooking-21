'use strict';

(function () {
  const filters = document.querySelector(`.map__filters`);

  const sortDataArray = (dataArray) => {
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
    let array = dataArray.filter(function (arrayItem) {
      let isFiltered = true;
      switch (isFiltered) {
        case (arrayItem.offer.type !== filterValueArray.type && filterValueArray.type !== `any`):
          isFiltered = false;
          break;
        case (arrayItem.offer.rooms !== Number(filterValueArray.rooms) && filterValueArray.rooms !== `any`):
          isFiltered = false;
          break;
        case (arrayItem.offer.guests !== Number(filterValueArray.guests) && filterValueArray.guests !== `any`):
          isFiltered = false;
          break;
        case (arrayItem.offer.price >= FilterOfferPrice.priceMin && filterValueArray.price === `low`):
          isFiltered = false;
          break;
        case (arrayItem.offer.price <= FilterOfferPrice.priceMax && filterValueArray.price === `high`):
          isFiltered = false;
          break;
        case ((arrayItem.offer.price <= FilterOfferPrice.priceMin || arrayItem.offer.price >= FilterOfferPrice.priceMax) && filterValueArray.price === `middle`):
          isFiltered = false;
          break;

        case (arrayItem.offer.features !== filterValueArray.features && filterValueArray.features.length !== 0):
          filterValueArray.features.forEach((feature) => {
            if (!arrayItem.offer.features.includes(feature)) {
              isFiltered = false;
            }
          });
          break;
        default:
          isFiltered = true;
      }
      return isFiltered;
    });

    return array;
  };

  window.filter = {
    sortDataArray
  };

})();
