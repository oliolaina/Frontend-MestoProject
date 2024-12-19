// валидация форм

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  inputSelector,
  errorClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(inputSelector);
  errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, inputSelector, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = "";
  inputElement.classList.remove(inputSelector);
  errorElement.classList.remove(errorClass);
}

function checkInputValidity(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  console.log("1");
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  } else {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((element) => !element.validity.valid);
}

function toggleButtonState(inputList, buttonElement, submitButtonSelector) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(submitButtonSelector);
  } else {
    buttonElement.classList.remove(submitButtonSelector);
  }
}

function setEventListeners(formElement, validationSettings) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSettings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationSettings.submitButtonSelector
  );
  toggleButtonState(
    inputList,
    buttonElement,
    validationSettings.inactiveButtonClass
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(
        formElement,
        inputElement,
        validationSettings.inputErrorClass,
        validationSettings.errorClass
      );
      toggleButtonState(
        inputList,
        buttonElement,
        validationSettings.inactiveButtonClass
      );
    });
  });
}

export function enableValidation(validationSettings) {
  const formList = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationSettings);
  });
}
