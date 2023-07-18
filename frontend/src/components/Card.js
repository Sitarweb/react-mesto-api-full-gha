import {useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import urn from "../images/urn.svg";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  // Шаблон по которому создается карточка

  const currentUser = useContext(CurrentUserContext);

  function handleLikeClick() {
    onCardLike(card);
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="elements__card">
      <img
        src={card.link}
        alt={card.name}
        className="elements__image"
        onClick={handleClick}
      />
      {isOwn && (
        <img
          className="elements__urn"
          alt="Урна"
          src={urn}
          onClick={handleDeleteClick}
        />
      )}
      <div className="elements__text">
        <h3 className="elements__title">{card.name}</h3>
        <div className="elements__like-info">
          <button
            className={`elements__heart-button ${
              isLiked && "elements__heart-button_active"
            }`}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="elements__likes-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
