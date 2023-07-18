import {useContext, useEffect} from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import useForm from "../hooks/useForm.js";

function EditProfilePopup({onUpdateUser, isOpen, onClose}) {
  const currentUser = useContext(CurrentUserContext);
  
  const {values, handleChange, setValues} = useForm({});

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(values);
  }

  useEffect(() => {setValues({
    name: currentUser.name,
    about: currentUser.about
  })}, [currentUser, isOpen]);

  // Попап редактирования профиля
  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        type="text"
        id="name-input"
        className="form__input form__input_mean_name"
        placeholder={"Имя профиля"}
        value={values.name || ""}
        autoComplete="off"
        minLength={2}
        maxLength={40}
        onChange={handleChange}
        required
      />
      <span className="form__input-error name-input-error"></span>
      <input
        name="about"
        type="text"
        id="job-input"
        className="form__input form__input_mean_job"
        placeholder={"Описание профиля"}
        value={values.about || ""}
        autoComplete="off"
        minLength={2}
        maxLength={200}
        onChange={handleChange}
        required
      />
      <span className="form__input-error job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
