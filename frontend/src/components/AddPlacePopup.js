import {useEffect} from "react";
import PopupWithForm from "./PopupWithForm.js";
import useForm from "../hooks/useForm.js";

function AddPlacePopup({onAddPlace, isOpen, onClose}) {
  const {values, handleChange, setValues} = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  useEffect(() => {setValues({})}, [isOpen]);

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        type="text"
        id="mesto-input"
        className="form__input form__input_card_title"
        placeholder={"Название"}
        value={values.name || ""}
        autoComplete="off"
        minLength={2}
        maxLength={30}
        onChange={handleChange}
        required
      />
      <span className="form__input-error mesto-input-error"></span>
      <input
        name="link"
        type="url"
        id="url-input"
        className="form__input form__input_card_link"
        placeholder={"Ссылка на картинку"}
        value={values.link || ""}
        autoComplete="off"
        onChange={handleChange}
        required
      />
      <span className="form__input-error url-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
