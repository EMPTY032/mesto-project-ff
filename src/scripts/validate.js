function enableValidation(validityObject) {
  const formList = Array.from(
    document.querySelectorAll(validityObject.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListener(validityObject, formElement);
  });
}

function setEventListener(validityObject, formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(validityObject.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validityObject.buttonSubmitSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(
        formElement,
        inputElement,
        validityObject.inputErrorClass,
        validityObject.errorClass
      );
      toggleButtonState(
        inputList,
        buttonElement,
        validityObject.inactiveButtonClass
      );
    });
  });
}

function checkInputValidity(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

function showInputError(
  formElement,
  inputElement,
  errorText,
  inputErrorClass,
  errorClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorText;
  errorElement.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
}

function toggleButtonState(inputList, buttonSubmit, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonSubmit.classList.add(inactiveButtonClass);
  } else {
    buttonSubmit.classList.remove(inactiveButtonClass);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function clearValidation(profileForm, validationConfig) {
  const inputList = Array.from(
    profileForm.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = profileForm.querySelector(
    validationConfig.buttonSubmitSelector
  );

  toggleButtonState(
    inputList,
    buttonElement,
    validationConfig.inactiveButtonClass
  );

  inputList.forEach((inputElement) => {
    hideInputError(
      profileForm,
      inputElement,
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    );
  });
}

export { enableValidation, clearValidation };
