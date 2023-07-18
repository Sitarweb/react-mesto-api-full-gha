import React from "react";

function InfoTooltip({name, image, altText, text, isOpen, onClose}) {
  return (
    <section
      className={`popup popup_${name} ${
        isOpen ? "popup_is-opened" : ""
      }`}
    >
      <div className="popup__content">
        <img className="tooltip__image" src={image} alt={altText} />
        <h2 className="tooltip__title">{text}</h2>
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
