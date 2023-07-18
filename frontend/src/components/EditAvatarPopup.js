import {useEffect} from "react";
import PopupWithForm from "./PopupWithForm.js";
import useForm from "../hooks/useForm.js";

function EditAvatarPopup({onUpdateAvatar, isOpen, onClose}) {
  const {values, handleChange, setValues} = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(values);
  }

  useEffect(() => {setValues({})}, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="link"
        type="url"
        id="avatar-input"
        className="form__input "
        placeholder={"Ссылка на фото"}
        value={values.link || ""}
        autoComplete="off"
        onChange={handleChange}
        required
      />
      <span className="form__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
