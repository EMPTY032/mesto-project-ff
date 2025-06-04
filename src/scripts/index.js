import "../pages/index.css";
import { initialCards } from "./cards";
import { createCard } from "./components/card";
import { openModal, closeModal } from "./components/modal";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");
const buttons = document.querySelectorAll("button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

const formEdit = document.forms["edit-profile"];
const inputName = formEdit.elements.name;
const inputDescription = formEdit.elements.description;

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const formNewCard = document.forms["new-place"];
const placeName = formNewCard.elements["place-name"];
const inputLink = formNewCard.elements.link;

function profileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = placeName.value;
  profileDescription.textContent = inputLink.value;

  const popup = document.querySelector(".popup_is-opened");

  closeModal(popup);
}

function cardFormSubmit(evt) {
  evt.preventDefault();

  placesList.prepend(
    createCard(
      { name: placeName.value, link: inputLink.value },
      deleteCard,
      cardTemplate,
      likeCard,
      openeImage
    )
  );

  const popup = document.querySelector(".popup_is-opened");
  closeModal(popup);

  placeName.value = "";
  inputLink.value = "";
}

formEdit.addEventListener("submit", profileFormSubmit);

formNewCard.addEventListener("submit", cardFormSubmit);

buttons.forEach((button) => {
  switch (button.classList.value) {
    case "profile__edit-button":
      button.addEventListener("click", () => {
        inputName.value = profileTitle.textContent;
        inputDescription.value = profileDescription.textContent;
        openModal(popupTypeEdit);
      });
      break;
    case "profile__add-button":
      button.addEventListener("click", () => {
        openModal(popupTypeNewCard);
      });
      break;
  }
});

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup__close")) {
    const popup = evt.target.closest(".popup");
    closeModal(popup);
  }

  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
});

document.addEventListener("keydown", (evt) => {
  if (evt.key == "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    if (popup) {
      closeModal(popup);
    }
  }
});

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function openeImage(cardImage, popupTypeImage, cardContentObject, openModal) {
  cardImage.addEventListener("click", () => {
    popupTypeImage.querySelector(".popup__image").src = cardContentObject.link;
    popupTypeImage.querySelector(".popup__caption").textContent =
      cardContentObject.name;
    openModal(popupTypeImage);
  });
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardContentObject) => {
  placesList.append(
    createCard(
      cardContentObject,
      deleteCard,
      cardTemplate,
      likeCard,
      openeImage
    )
  );
});
