// @todo: Темплейт карточки
const CardTemplate = document.querySelector("#card-template").content;
const placeBlock = document.querySelector(".places__list");

// @todo: Функция создания карточки
function CreateCard(name, link){
    const CardPattern = CardTemplate.querySelector(".places__item").cloneNode(true);
    CardPattern.querySelector(".card__title").textContent = name;
    CardPattern.querySelector(".card__image").src = link;
    placeBlock.append(CardPattern);
    return CardPattern;
}

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
    CreateCard(card.name, card.link);
});

//popups
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

//open popup
function openModal(popup) {      
    popup.classList.add('popup_is-opened');
    popup.querySelector(".popup__content").classList.add('popup_is-opened');
}

//edit profile button
const profileButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');


profileButton.addEventListener('click', function (event){
    openModal(profilePopup);
    const closeButton = profilePopup.querySelector(".popup__close");
    closeButton.addEventListener('click', function (event){
        closeModal(profilePopup);
    });
});

addButton.addEventListener('click', function (event){
    openModal(cardPopup);
    const closeButton = cardPopup.querySelector(".popup__close");
    closeButton.addEventListener('click', function (event){
        closeModal(cardPopup);
    });
});

//close popup
function closeModal(popup){
    popup.classList.remove('popup_is-opened');
    popup.querySelector(".popup__content").classList.remove('popup_is-opened');
}

//EditProfile form submit
const profileFormElement = profilePopup.querySelector(".popup__form");
const nameInput = profileFormElement.querySelector(".popup__input_type_name");
const jobInput = profileFormElement.querySelector(".popup__input_type_description");

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    // Получите значение полей jobInput и nameInput из свойства value
    const name = nameInput.value;
    const job = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const profileName = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");
    // Вставьте новые значения с помощью textContent
    profileName.textContent = name;
    profileDescription.textContent = job;

    closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit); 

//submit addImage form
const cardForm = cardPopup.querySelector(".popup__form");
const cardNameInput = cardForm.querySelector(".popup__input_type_card-name");
const linkInput = cardForm.querySelector(".popup__input_type_url");

function handleCardFormSubmit(evt) {
    evt.preventDefault(); 
    
    const name = cardNameInput.value;
    const link = linkInput.value;

    const newCard = CreateCard(name, link);
    closeModal(cardPopup);
}

cardForm.addEventListener('submit', handleCardFormSubmit); 


// @todo: Функция удаления карточки


