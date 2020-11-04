'use strict';

(function () {
  const filters = document.querySelector(`.map__filters`);
  window.sortDataArray = (dataArray) => {

    let housingType = filters.querySelector(`#housing-type`).value;
    let array = [];
    if (housingType === `any`) {
      array = dataArray;
    } else {
      for (let i = 0; i < dataArray.length; i++) {

        if (dataArray[i].offer.type === housingType) {
          array.push(dataArray[i]);
        }
      }
    }
    return array;
  };
  filters.addEventListener(`change`, function () {
    window.form.removePins();
    window.page.showPins();
    window.page.removeCard();
  });
})();
