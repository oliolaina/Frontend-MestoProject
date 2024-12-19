import "../pages/index.css";

import { createCard } from "./cards.js";
import { enableValidation } from "./validate.js";
import { openModal, closeModal } from "./modal.js";
import { initialCards } from "./cards-template.js";


// поп-ап - изображение
const imagePopup = document.querySelector(".popup_type_image");
const imageImage = imagePopup.querySelector(".popup__image");
const imageCloseButton = imagePopup.querySelector(".popup__close");
const imageCaption = document.querySelector(".popup__caption");
//закрытие картинки
imageCloseButton.addEventListener("click", function () {
  closeModal(imagePopup);
});


// поп-апы и кнопки, которые их вызывают
const profilePopup = document.querySelector(".popup_type_edit");
const profileForm = profilePopup.querySelector(".popup__form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector(".popup__input_type_name");
const profileDescriptionInput = document.querySelector(".popup__input_type_description");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileCloseButton = profilePopup.querySelector(".popup__close");
//события  окна редактора профиля
profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profilePopup);
});
profileCloseButton.addEventListener("click", function () {
  closeModal(profilePopup);
});
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profilePopup.querySelector(".popup__button").textContent = "Сохранение...";
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  fetch('https://nomoreparties.co/v1/frontend-st-cohort-201/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'b75e38fb-2f74-4b94-a5ec-aabb6cb501f3',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: profileTitleInput.value,
      about: profileDescriptionInput.value
    })
    })
    .then(closeModal(profilePopup))
    .finally(profilePopup.querySelector(".popup__button").textContent = "Сохранить")
    .catch(error => {
      console.error("Error fetching cards:", error);
    });
  
}
profileForm.addEventListener("submit", handleProfileFormSubmit);


// карточки
const cardTitleInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");
const cardPlacesList = document.querySelector(".places__list");
const cardPopup = document.querySelector(".popup_type_new-card");
const cardAddButton = document.querySelector(".profile__add-button");
const cardCloseButton = cardPopup.querySelector(".popup__close");
const cardForm = cardPopup.querySelector(".popup__form");
//добавление новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  cardPopup.querySelector(".popup__button").textContent = "Сохранение...";
  const newCard = createCard(cardTitleInput.value, cardLinkInput.value, 0);
  cardPlacesList.prepend(newCard);
  addCardRequest(cardTitleInput.value, cardLinkInput.value);
  cardPopup.querySelector(".popup__button").textContent = "Сохранить";
  console.log("card added: ", cardTitleInput.value,cardLinkInput.value);
}
cardAddButton.addEventListener("click", function () {
  cardTitleInput.value = "";
  cardLinkInput.value = "";
  openModal(cardPopup);
});
cardCloseButton.addEventListener("click", function () {
  closeModal(cardPopup);
});
cardForm.addEventListener("submit", handleCardFormSubmit);
//открытие картинки
cardPlacesList.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("card__image")) {
    imageImage.setAttribute("src", "");
    imageImage.setAttribute("src", evt.target.src);
    imageCaption.textContent = evt.target.alt;
    openModal(imagePopup);
  }
});

// анимации
profilePopup.classList.add("popup_is-animated");
cardPopup.classList.add("popup_is-animated");
imagePopup.classList.add("popup_is-animated");

// Создание объекта с настройками валидации
const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_type_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_visible",
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(validationSettings);

//
function setUserRequest(){
  return fetch('https://nomoreparties.co/v1/frontend-st-cohort-201/users/me', {
  method: 'GET',
  headers: {
    authorization: 'b75e38fb-2f74-4b94-a5ec-aabb6cb501f3'
  }
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((result) => {
    console.log("user ", result);
    return result;
  })
  .then( function (object) {
    profileTitle.textContent = object.name;
    profileDescription.textContent = object.about;
    avatar.style.background = `url(${object.avatar})`;
    avatar.style.objectFit = "contain";
    avatar.style.backgroundSize = "contain";
    console.log("Данные успешно установлены");
  })
  .catch(error => {
    console.error("Error fetching profile info:", error);
  }); 
}


function GETcardsRequest(){
  return fetch('https://nomoreparties.co/v1/frontend-st-cohort-201/cards', {
  method: 'GET',
  headers: {
    authorization: 'b75e38fb-2f74-4b94-a5ec-aabb6cb501f3'
  }
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((result) => {
    console.log("uploaded Cards ", result);
    return result;
  })
  .then(uploadedCards => {
    uploadedCards.forEach(function(card) {
      const newCard = createCard(card.name, card.link, card.likes.length);
      //события лайка
      newCard.querySelector(".card__like-button").addEventListener('click', function (evt) {
          if (evt.target.classList.contains("card__like-button_is-active")){
            fetch(`https://nomoreparties.co/v1/frontend-st-cohort-201/cards/likes/${card._id}`, {
              method: 'DELETE',
              headers: {
                authorization: 'b75e38fb-2f74-4b94-a5ec-aabb6cb501f3'
              }
            })
            .catch(error => {
              console.error("Error liking:", error);
            }); 
            newCard.querySelector(".card__like-button").classList.remove("card__like-button_is-active");
            newCard.querySelector(".like_counter").textContent = Number(newCard.querySelector(".like_counter").textContent) - 1;
          }
          else {
            fetch(`https://nomoreparties.co/v1/frontend-st-cohort-201/cards/likes/${card._id}`, {
              method: 'PUT',
              headers: {
                authorization: 'b75e38fb-2f74-4b94-a5ec-aabb6cb501f3'
              }
            })
            .then((res) => res.json())
            .then((res) => console.log("like added",res))
            .catch(error => {
              console.error("Error liking:", error);
            }); 
            newCard.querySelector(".card__like-button").classList.add("card__like-button_is-active");
            newCard.querySelector(".like_counter").textContent = Number(newCard.querySelector(".like_counter").textContent) + 1;
          }
      });
      if (card.owner._id !== "d426b35ac965be93458533cb"){
        newCard.querySelector(".card__delete-button").classList.add("hidden");
      }
      else { //добавление обработчика удаления своей карточки
        newCard.querySelector(".card__delete-button").addEventListener('click', function (evt){
          fetch(`https://nomoreparties.co/v1/frontend-st-cohort-201/cards/${card._id}`, {
            method: 'DELETE',
            headers: {
              authorization: 'b75e38fb-2f74-4b94-a5ec-aabb6cb501f3'
            }
          })
          .then(res => newCard.classList.add("hidden"))
          .catch(error => {
            console.error("Error deleting card:", error);
          }); 
        });
      }
      const likedByMe = card.likes.some(function(user){
        return user._id == "d426b35ac965be93458533cb";
      })
      if (likedByMe){
        newCard.querySelector(".card__like-button").classList.add("card__like-button_is-active");
      }
      cardPlacesList.append(newCard);


    });
    return uploadedCards;
  })
  .catch(error => {
    console.error("Error fetching cards:", error);
  });
}

function addCardRequest(picName, picLink){
  return fetch('https://nomoreparties.co/v1/frontend-st-cohort-201/cards', {
    method: 'POST',
    headers: {
      authorization: 'b75e38fb-2f74-4b94-a5ec-aabb6cb501f3',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: picName,
      link: picLink
    })
    })
    .then(closeModal(cardPopup))
    .catch(error => {
      console.error("Error fetching cards:", error);
    });
}



//редактор аватара
const avatar = document.querySelector(".profile__image");
const editPic = document.querySelector(".avatar_svg");
const editPicBackground = document.querySelector(".avatar_black");

avatar.addEventListener('mouseover', function (evt){
  editPic.classList.add("avatar_hover");
  editPic.classList.add("unhidden");
  editPicBackground.style.display = 'block';
});

avatar.addEventListener('mouseout', function (evt){
  editPic.classList.remove("avatar_hover");
  editPic.classList.remove("unhidden");
  editPicBackground.style.display = 'none';
});

//обновление аватара
const avatarPopup = document.querySelector(".popup_type_avatar");
avatarPopup.classList.add("popup_is-animated");

const avatarButton = document.querySelector(".button_avatar");
avatarButton.style.border = "unset";
avatarButton.style.reset = "all";
avatarButton.style.cursor = "pointer";
avatarButton.style.background = "black";

const avatarCloseButton = avatarPopup.querySelector(".popup__close");
const avatarForm = avatarPopup.querySelector(".popup__form");
const avatarLinkValue = avatarPopup.querySelector(".popup__input_type_avatar");

avatarButton.addEventListener('click', function(evt){
  openModal(avatarPopup);
});

avatarCloseButton.addEventListener('click', function(evt){
  closeModal(avatarPopup);
});

function handleAvatarFormSubmit(evt){
  evt.preventDefault();
  avatarPopup.querySelector(".popup__button").textContent = "Сохранение...";
  const link = avatarLinkValue.value;
  
  avatar.style.background = `url(${link})`;
  avatar.style.backgroundSize = "contain";
  avatar.style.objectFit = "contain";
  
  fetch('https://nomoreparties.co/v1/frontend-st-cohort-201/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: 'b75e38fb-2f74-4b94-a5ec-aabb6cb501f3',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: link
    })
    })
    .then(avatarPopup.querySelector(".popup__input_type_avatar").value = '')
    .then(closeModal(avatarPopup))
    .finally(avatarPopup.querySelector(".popup__button").textContent = "Сохранить")
    .catch(error => {
      console.error("Error changing avatar:", error);
    });
}

avatarForm.addEventListener('submit', handleAvatarFormSubmit);

setUserRequest();
GETcardsRequest();
