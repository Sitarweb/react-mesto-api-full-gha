import React from "react";

function ImagePopup({selectedCard, onClose}) {
  // Попап увеличения картинки карточки
  return (
    <section
      className={`popup popup_images ${
        selectedCard != null ? "popup_is-opened" : ""
      } `}
    >
      <div className="popup__content-image">
        <figure className="popup__figure">
          <img
            src={selectedCard?.link}
            alt={selectedCard?.name}
            className="popup__image"
          />
          <figcaption className="popup__subtitle">
            {selectedCard?.name}
          </figcaption>
        </figure>
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
