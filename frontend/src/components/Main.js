import {useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from "../components/Card.js";

function Main({onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content">
          <button
            className="profile__avatar-edit"
            type="button"
            onClick={onEditAvatar}
          >
            <img
              src={currentUser.avatar}
              alt="Ваше фото"
              className="profile__avatar"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__info-title">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__info-paragraph">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
