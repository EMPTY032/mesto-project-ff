function openModal(popap) {
  popap.classList.add("popup_is-opened");
}

function closeModal(popap) {
  popap.classList.remove("popup_is-opened");
}

export { openModal, closeModal };
