// @todo: Темплейт карточки
const CardTemplate = document.querySelector("#card-template").content;
const placeBlock = document.querySelector(".places__list");

function CreateCard(name, link){
    const CardPattern = CardTemplate.querySelector(".places__item").cloneNode(true);
    CardPattern.querySelector(".card__title").textContent = name;
    CardPattern.querySelector(".card__image").src = link;
    placeBlock.append(CardPattern);
}

initialCards.forEach(card => {
    CreateCard(card.name, card.link);
});
// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
