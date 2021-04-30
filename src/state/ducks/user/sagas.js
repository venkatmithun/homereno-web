import axios from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { userActions } from '.';
import { AppConstants } from '../../../config/AppConstants';
import Api from '../../middleware/Api';
import { types } from './types';
import { dispatch, history } from '../../ReduxStore';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

export function* loginUser(action) {
  try {
    const response = yield call(Api.post, AppConstants.AUTH_API + 'signin', {
      email: action.payload.username,
      password: action.payload.password,
    });
    console.log('response from login saga', response);
    if (response.data) {
      const { data } = response;
      if (data.accessToken) {
        axios.defaults.headers.common = {
          Authorization: `Bearer ${data.accessToken}`,
        };
        yield put({
          type: types.SAVE_TOKEN,
          payload: {
            token: data.accessToken,
            getUser: data.user ? false : true,
          },
        });
      }
      if (data.user) {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(data.user));
        dispatch(userActions.saveUser(data.user));
      }
    }
  } catch (e) {
    console.log('error login user', e);
  }
}

export function* signupUser(action) {
  const { payload: user } = action;
  try {
    const response = yield call(Api.post, AppConstants.AUTH_API + 'signup', {
      displayName: user.displayName,
      email: user.email,
      password: user.password,
      matchingPassword: user.matchingPassword,
      socialProvider: 'LOCAL',
      type: 0,
    });
    if (response.data && response.data.message) {
      history.push('/login');
    }
    console.log('signupUser response', response);
  } catch (e) {
    console.log('error sign up user', e);
  }
}

export function* fetchUser(action) {
  const token = action.payload.token;
  if (token) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  if (action.payload.getUser) {
    const response = yield call(Api.get, AppConstants.API_URL + 'user/me');
    const userData = { ...response.data };
    console.log('fetchUser Response', userData);
    if (userData) {
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(userData));
      dispatch(userActions.saveUser(userData));
    }
  }
}

export function logOut() {
  window.sessionStorage.clear();
  history.push('/home');
}

export function* watchUser() {
  yield all([
    takeEvery(types.LOGIN_USER, loginUser),
    takeEvery(types.SIGN_UP, signupUser),
    takeEvery(types.FETCH_USER, fetchUser),
    takeEvery(types.SAVE_TOKEN, fetchUser),
    takeEvery(types.LOG_OUT, logOut),
  ]);
}
