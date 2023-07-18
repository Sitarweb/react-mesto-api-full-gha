class Auth {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  // Метод определяет прошёл запрос успешно или нет
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  // Универсальный метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  // Метод регистирует пользователя
  signup({ password, email }) {
    return this._request(`${this._url}/signup`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ password, email }),
    });
  }

  // Метод позволяет пользователю авторизоваться, проверяя учетные данные
  signin({ password, email }) {
    return this._request(`${this._url}/signin`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ password, email }),
    });
  }

  // Метод проверяет валидность токена
  getCurrentUser(jwt) {
    return this._request(`${this._url}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    });
  }
}

const auth = new Auth({
  url: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
