import { like, deleteLike, deletedCardApi } from "../api";

function createCard(
  cardContentObject,
  deleteCard,
  cardTemplate,
  likeCard,
  openeImage,
  popupTypeImage,
  userObject
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = cardContentObject.link;
  cardElement.querySelector(
    ".card__image"
  ).alt = `Фотография места${cardContentObject.name}`;

  cardElement.querySelector(".card__image").addEventListener("click", () => {
    openeImage(cardContentObject, popupTypeImage);
  });

  cardElement.querySelector(".card__title").textContent =
    cardContentObject.name;

  cardElement.querySelector(".card__like-curent").textContent =
    cardContentObject.likes.length;

  cardContentObject.likes.some((like) => {
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

function deleteCard(evt, cardID) {
  deletedCardApi(cardID)
    .then(() => {
      evt.target.closest(".card").remove();
    })
    .catch((err) => {
      console.error(err);
    });
}

function likeCard(evt, cardID, cardTitle) {
  if (!evt.target.classList.contains("card__like-button_is-active")) {
    like(cardID)
      .then((res) => {
        toggleLike(evt);
        cardTitle.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    deleteLike(cardID)
      .then((res) => {
        toggleLike(evt);
        cardTitle.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function toggleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
