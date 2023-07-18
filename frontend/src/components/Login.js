import {useEffect} from "react";
import useForm from "../hooks/useForm.js";

function Login({onLogin}) {
  const {values, handleChange, setValues} = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

  useEffect(() => {setValues({})}, [onLogin]);

  return (
    <div className="sign">
      <h2 className="sign__title">Вход</h2>
      <form className="sign__form" onSubmit={handleSubmit}>
        <input
          className="sign__input"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={40}
        />
        <input
          className="sign__input sign__input_password"
          type="password"
          name="password"
          placeholder="Пароль"
          value={values.password || ""}
          onChange={handleChange}
          autoComplete="off"
          required
          minLength={3}
          maxLength={40}
        />
        <button className="sign__submit-button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
