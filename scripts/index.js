// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(cardContentObject, deletedCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = cardContentObject.link;
  cardElement.querySelector(".card__title").textContent =
    cardContentObject.name;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deletedCard);

  return cardElement;
}

// @todo: Функция удаления карточки
function deletedCard(evt) {
  evt.target.closest(".card").remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((cardContentObject) => {
  placesList.append(createCard(cardContentObject, deletedCard));
});
