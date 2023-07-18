import React from "react";

// Данная функция является шаблоном для собрания попапов проекта

function PopupWithForm({name, title, buttonText, children, onSubmit, isOpen, onClose}) {
  // children - здесь храниться доп. разметка каждого попапа(input, span) , isOpen - функция открытия попапа, onClose - функция закрытия
  return (
    <section
      className={`popup popup_${name} ${
        isOpen ? "popup_is-opened" : ""
      }`}
    >
      <div className="popup__content">
        <h2 className="popup__title">{title}</h2>
        <form
          className="form"
          name={`${name}-form`}
          onSubmit={onSubmit}
        >
          {children}
          <button className="form__button-save" type="submit">
            {buttonText || "Сохранить"}
          </button>
        </form>
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        />
      </div>
    </section>
  );
}

export default PopupWithForm;
