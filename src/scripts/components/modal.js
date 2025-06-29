function openModal(popap) {
  popap.classList.add("popup_is-opened");
  document.addEventListener("mousedown", clickClose);

  document.addEventListener("keydown", keyClose);
}

function closeModal(popap) {
  popap.classList.remove("popup_is-opened");
  document.removeEventListener("mousedown", clickClose);

  document.removeEventListener("keydown", keyClose);
}

function clickClose(evt) {
  if (evt.target.classList.contains("popup__close")) {
    closeModal(evt.target.closest(".popup"));
  }

  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}

function keyClose(evt) {
  if (evt.key == "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    if (popup) {
      closeModal(popup);
    }
  }
}

export { openModal, closeModal };
