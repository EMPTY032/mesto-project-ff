import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card";
import { openModal, closeModal } from "./components/modal";
import { enableValidation, clearValidation } from "./validate";
import { userInfo, cards, updateUserInfo, card, avatarPatch } from "./api";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
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
const validationCongig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  buttonSubmitSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input-error_active",
};

Promise.all([userInfo, cards])
  .then(([user, cards]) => {
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
          popupTypeImage,
          user
        )
      );
    });
  })
  .catch((err) => {
    console.error(err);
  });

function profileFormSubmit(evt) {
  evt.preventDefault();
  console.log(evt.target);
  renderLoading(evt.target.querySelector(".popup__button"), true);
  updateUserInfo(inputName, inputDescription)
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      closeModal(popupTypeEdit);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(evt.target.querySelector(".popup__button"), false);
    });
}

function cardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt.target.querySelector(".popup__button"), true);

  Promise.all([userInfo, card(placeName, inputLink)])
    .then(([user, card]) => {
      placesList.prepend(
        createCard(
          card,
          deleteCard,
          cardTemplate,
          likeCard,
          openeImage,
          popupTypeImage,
          user
        )
      );
      closeModal(popupTypeNewCard);
      formNewCard.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(evt.target.querySelector(".popup__button"), false);
    });
}

function avatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt.target.querySelector(".popup__button"), true);

  avatarPatch(avatarLink)
    .then((result) => {
      profileAvatar.style.backgroundImage = `url(${result.avatar})`;
      closeModal(popupTypeNewAvatar);
      formNewAvatar.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(evt.target.querySelector(".popup__button"), false);
    });
}

function openeImage(cardContentObject, popupTypeImage) {
  popupTypeImage.querySelector(".popup__image").src = cardContentObject.link;
  popupTypeImage.querySelector(
    ".popup__image"
  ).alt = `Фотография места${cardContentObject.name}`;
  popupTypeImage.querySelector(".popup__caption").textContent =
    cardContentObject.name;
  openModal(popupTypeImage);
}

formEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();

  profileFormSubmit(evt);
});

formNewCard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  cardFormSubmit(evt);
});

formNewAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();

  avatarFormSubmit(evt);
});

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    inputName.value = profileTitle.textContent;
    inputDescription.value = profileDescription.textContent;
    clearValidation(formEdit, validationCongig);
    openModal(popupTypeEdit);
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  placeName.value = "";
  inputLink.value = "";
  clearValidation(formNewCard, validationCongig);
  openModal(popupTypeNewCard);
});

document.querySelector(".profile__overlay").addEventListener("click", () => {
  clearValidation(formNewAvatar, validationCongig);
  openModal(popupTypeNewAvatar);
});

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

enableValidation(validationCongig);

function renderLoading(element, isLoading) {
  if (isLoading) {
    element.textContent += "...";
  } else {
    element.textContent = "Coхранить";
  }
}
