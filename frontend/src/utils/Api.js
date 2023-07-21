class Api {
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

  // Метод загружает информацию о пользователе
  _getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers,
    });
  }

  // Метод загружает карточки
  _getInitialCards() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers,
    });
  }

  // Метод возвращает промисы GET запросов
  getAllNeededData() {
    return Promise.all([this._getUserInfo(), this._getInitialCards()]);
  }

  // Метод сохраняет отредактированную информацию о пользователе
  patchUserInfo(data) {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  // Метод добавляет новую карточку
  postNewCard(data) {
    return this._request(`${this._url}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  // Метод удаляет карточку
  deleteCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  // Метод лайкает карточку
  _putLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "PUT",
    });
  }

  // Метод удаляет лайк с карточки
  _deleteLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "DELETE",
    });
  }
  
  // Метод, в зависимости от значения переменной, вызывает метод, который ставит (удаляет) лайк
  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this._deleteLike(cardId) : this._putLike(cardId);
  }

  // Метод обновляет аватар профиля
  patchUserAvatar(data) {
    return this._request(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.link,
      }),
    });
  }

  getJwt(){
    return this._headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
  }
}

const api = new Api({
  url: "https://api.semeontarasenko.nomoredomains.xyz",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
