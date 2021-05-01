import { types } from './types';

export function saveToken(payload) {
  return {
    type: types.SAVE_TOKEN,
    payload: { token: payload.token, getUser: payload.getUser || true },
  };
}

export function fetchUser() {
  return {
    type: types.FETCH_USER,
  };
}

export function login(credentials) {
  return {
    type: types.LOGIN_USER,
    payload: credentials,
  };
}

export function logOut() {
  return {
    type: types.LOG_OUT,
  };
}

export function signup(user) {
  return {
    type: types.SIGN_UP,
    payload: user,
  };
}

export function savePaintJob(payload) {
  return {
    type: types.SAVE_PAINT_JOB,
    payload: payload,
  };
}

export function saveUser(user) {
  console.log('save user action', user);
  return {
    type: types.SAVE_USER,
    payload: user,
  };
}
