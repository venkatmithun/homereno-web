const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

export const TokenStorageService = {
  signOut() {
    window.sessionStorage.clear();
  },
  saveToken(token) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  },
  getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  },
  saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  },
};
