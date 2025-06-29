import "../pages/index.css";
import {
  createCard,
  deleteCard,
  likeCard,
  openeImage,
} from "./components/card";
import { openModal, closeModal } from "./components/modal";
import { enableValidation, clearValidation } from "./validate";
import { userInfo, cards, updateUserInfo, card, avatarPatch } from "./api";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");
const buttons = document.querySelectorAll("button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeNewAvatar = document.querySelector(".popup_type_avatar");

const formEdit = document.forms["edit-profile"];
const inputName = formEdit.elements.name;
const inputDescription = formEdit.elements.description;

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

const formNewCard = document.forms["new-place"];
const placeName = formNewCard.elements["place-name"];
const inputLink = formNewCard.elements.link;

const formNewAvatar = document.forms["edit-avatar"];
const avatarLink = formNewAvatar.elements["avatar-link"];

Promise.all([userInfo, cards]).then(([user, cards]) => {
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
  profileAvatar.style.backgroundImage = `url(${user.avatar})`;

  // @todo: Вывести карточки на страницу
  cards.forEach((cardContentObject) => {
    placesList.append(
      createCard(
        cardContentObject,
        deleteCard,
        cardTemplate,
        likeCard,
        openeImage,
        user
      )
    );
  });
});

function profileFormSubmit(evt) {
  evt.preventDefault();
  console.log(evt.target);
  renderLoading(evt.target.querySelector(".popup__button"), true);
  updateUserInfo(inputName, inputDescription).then((result) => {
    profileTitle.textContent = result.name;
    profileDescription.textContent = result.about;
    renderLoading(evt.target.querySelector(".popup__button"), false);
    closeModal(popupTypeEdit);
  });
}

function cardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt.target.querySelector(".popup__button"), true);

  Promise.all([userInfo, card(placeName, inputLink)]).then(([user, card]) => {
    placesList.prepend(
      createCard(card, deleteCard, cardTemplate, likeCard, openeImage, user)
    );
    renderLoading(evt.target.querySelector(".popup__button"), false);
    closeModal(popupTypeNewCard);
    formNewCard.reset();
  });
}

function avatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt.target.querySelector(".popup__button"), true);

  avatarPatch(avatarLink)
    .then((result) => {
      profileAvatar.style.backgroundImage = `url(${result.avatar})`;
      renderLoading(evt.target.querySelector(".popup__button"), false);
      closeModal(popupTypeNewAvatar);
      formNewAvatar.reset();
    })
    .catch((err) => {
      renderLoading(evt.target.querySelector(".popup__button"), false);
      alert(err);
    });
}

formEdit.addEventListener("submit", profileFormSubmit);

formNewCard.addEventListener("submit", cardFormSubmit);

formNewAvatar.addEventListener("submit", avatarFormSubmit);

buttons.forEach((button) => {
  switch (button.classList.value) {
    case "profile__edit-button":
      button.addEventListener("click", () => {
        inputName.value = profileTitle.textContent;
        inputDescription.value = profileDescription.textContent;
        clearValidation(formEdit, {
          inputSelector: ".popup__input",
          buttonSubmitSelector: ".popup__button",
          inactiveButtonClass: "popup__button_inactive",
          inputErrorClass: "popup__input_error",
          errorClass: "popup__input-error_active",
        });
        openModal(popupTypeEdit);
      });
      break;
    case "profile__add-button":
      button.addEventListener("click", () => {
        clearValidation(formNewCard, {
          inputSelector: ".popup__input",
          buttonSubmitSelector: ".popup__button",
          inactiveButtonClass: "popup__button_inactive",
          inputErrorClass: "popup__input_error",
          errorClass: "popup__input-error_active",
        });
        openModal(popupTypeNewCard);
      });
      break;
    case "profile__overlay":
      button.addEventListener("click", () => {
        clearValidation(formNewAvatar, {
          inputSelector: ".popup__input",
          buttonSubmitSelector: ".popup__button",
          inactiveButtonClass: "popup__button_inactive",
          inputErrorClass: "popup__input_error",
          errorClass: "popup__input-error_active",
        });
        openModal(popupTypeNewAvatar);
      });
      break;
  }
});

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  buttonSubmitSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input-error_active",
});

function renderLoading(element, isLoading) {
  if (isLoading) {
    element.textContent += "...";
  } else {
    element.textContent = "Coхранить";
  }
}
