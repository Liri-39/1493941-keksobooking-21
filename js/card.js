'use strict';

const renderCard = function (card) {
  const CARD_PHOTO_WIDTH = 45;
  const CARD_PHOTO_HEIGHT = 40;
  const cardTemplate = document.querySelector(`#card`)
    .content
    .querySelector(`.map__card`);
  const cardElement = cardTemplate.cloneNode(true);
  const photosList = cardElement.querySelector(`.popup__photos`);
  const featuresList = cardElement.querySelector(`.popup__features`);
  const offer = card.offer;
  const author = card.author;
  const featuresArray = offer.features;
  const photosArray = offer.photos;
  cardElement.querySelector(`.popup__title`).textContent = `${offer.title}`;
  cardElement.querySelector(`.popup__text--address`).textContent = `${offer.address}`;
  cardElement.querySelector(`.popup__text--price`).textContent = `${offer.price}₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = window.form.TYPES[offer.type][name];
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;


  featuresList.innerHTML = ``;
  for (let i = 0; i < featuresArray.length; i++) {
    const feature = document.createElement(`li`);
    feature.className = `popup__feature popup__feature--${offer.features[i]}`;
    featuresList.appendChild(feature);
  }

  cardElement.querySelector(`.popup__description`).textContent = `${offer.description}`;


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
window.card = {
  renderCard
};
