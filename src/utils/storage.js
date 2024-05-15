const storagePrefix = 'bulletproof_react_';

const storage = {
  getToken: () => {
    return JSON.parse(/** @type {string} */(window.localStorage.getItem(`${storagePrefix}token`)));
  },
  setToken: (/** @type {string} */token) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
};

export default storage;
