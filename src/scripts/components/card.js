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

  openeImage(
    cardElement.querySelector(".card__image"),
    popupTypeImage,
    cardContentObject,
    openModal
  );

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

export { createCard };
