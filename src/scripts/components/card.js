import { openModal } from "./modal";

const popupTypeImage = document.querySelector(".popup_type_image");

function createCard(
  cardContentObject,
  deleteCard,
  cardTemplate,
  likeCard,
  openeImage
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = cardContentObject.link;

  cardElement.querySelector(".card__image").addEventListener("click", () => {
    openeImage(cardContentObject);
  });

  cardElement.querySelector(".card__title").textContent =
    cardContentObject.name;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);
  return cardElement;
}

function openeImage(cardContentObject) {
  popupTypeImage.querySelector(".popup__image").src = cardContentObject.link;
  popupTypeImage.querySelector(".popup__caption").textContent =
    cardContentObject.name;
  openModal(popupTypeImage);
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard, openeImage };
