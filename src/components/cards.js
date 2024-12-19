// создание карточки

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(name, link, likeNumber) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector(".like_counter");

  cardTitle.textContent = name;

  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", name.toLowerCase());

  cardLikeCounter.textContent = likeNumber;
  
  

  return cardElement;
}


