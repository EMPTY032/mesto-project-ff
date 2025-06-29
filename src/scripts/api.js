const config = {
  headers: {
    authorization: "f0663ea4-8267-4f20-8b18-ca4f99c82059",
    "Content-Type": "application/json",
  },
};

const userInfo = fetch("https://nomoreparties.co/v1/wff-cohort-41/users/me", {
  headers: config.headers,
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });

const cards = fetch("https://nomoreparties.co/v1/wff-cohort-41/cards", {
  headers: {
    authorization: config.headers.authorization,
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });

const updateUserInfo = (inputName, inputDescription) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-41/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: inputName.value,
      about: inputDescription.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const card = (placeName = "ошибка", inputLink = "ошибка") => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-41/cards", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: placeName.value,
      link: inputLink.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const avatarPatch = (avatarLink) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-41/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "f0663ea4-8267-4f20-8b18-ca4f99c82059",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarLink.value,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const deletedCardApi = (cardID) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-41/cards/${cardID}`, {
    method: "DELETE",
    headers: {
      authorization: "f0663ea4-8267-4f20-8b18-ca4f99c82059",
    },
  });
};

export { userInfo, cards, updateUserInfo, card, avatarPatch, deletedCardApi };
