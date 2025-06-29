import { openModal } from "./modal";
import { deletedCardApi } from "../api";

const popupTypeImage = document.querySelector(".popup_type_image");

function createCard(
  cardContentObject,
  deleteCard,
  cardTemplate,
  likeCard,
  openeImage,
  userObject
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = cardContentObject.link;

  cardElement.querySelector(".card__image").addEventListener("click", () => {
    openeImage(cardContentObject);
  });

  cardElement.querySelector(".card__title").textContent =
    cardContentObject.name;

  cardElement.querySelector(".card__like-curent").textContent =
    cardContentObject.likes.length;

  cardContentObject.likes.forEach((like) => {
    if (like._id == userObject._id) {
      cardElement
        .querySelector(".card__like-button")
        .classList.toggle("card__like-button_is-active");
    }
  });

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => {
      likeCard(
        evt,
        cardContentObject._id,
        cardElement.querySelector(".card__like-curent")
      );
    });

  if (cardContentObject.owner._id != userObject._id) {
    cardElement.querySelector(".card__delete-button").remove();
  } else {
    cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", (evt) => {
        deleteCard(evt, cardContentObject._id);
      });
  }

  return cardElement;
}

function openeImage(cardContentObject) {
  popupTypeImage.querySelector(".popup__image").src = cardContentObject.link;
  popupTypeImage.querySelector(".popup__caption").textContent =
    cardContentObject.name;
  openModal(popupTypeImage);
}

function deleteCard(evt, cardID) {
  evt.target.closest(".card").remove();
  deletedCardApi(cardID);
}

function likeCard(evt, cardID, cardTitle) {
  evt.target.classList.toggle("card__like-button_is-active");
  console.log(evt.target.classList.contains("card__like-button_is-active"));
  if (evt.target.classList.contains("card__like-button_is-active")) {
    console.log("лайк будет поставлен");
    fetch(`https://nomoreparties.co/v1/wff-cohort-41/cards/likes/${cardID}`, {
      method: "PUT",
      headers: {
        authorization: "f0663ea4-8267-4f20-8b18-ca4f99c82059",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        cardTitle.textContent = res.likes.length;
      });
  } else {
    console.log("лайк будет удален");
    fetch(`https://nomoreparties.co/v1/wff-cohort-41/cards/likes/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: "f0663ea4-8267-4f20-8b18-ca4f99c82059",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        cardTitle.textContent = res.likes.length;
      });
  }
}

export { createCard, deleteCard, likeCard, openeImage };
