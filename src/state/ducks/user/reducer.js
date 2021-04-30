import { types } from './types';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

const initialState = {
  userId: null,
  token: sessionStorage.getItem(TOKEN_KEY),
  loggedIn: false,
  firstName: '',
  lastName: '',
  email: '',
  displayName: '',
  address: '',
  phoneNumber: '',
  role: '',
  ...JSON.parse(sessionStorage.getItem(USER_KEY)),
};

export default function userState(state = initialState, action) {
  switch (action.type) {
    case types.LOG_OUT:
      return {
        userId: null,
        token: null,
        loggedIn: false,
        firstName: '',
        lastName: '',
        email: '',
        displayName: '',
        address: '',
        phoneNumber: '',
        role: '',
      };

    case types.SAVE_TOKEN:
      return {
        ...state,
        ...action.payload,
      };

    case types.SAVE_USER:
      return {
        ...state,
        ...action.payload,
      };

    // getPublicContent() {
    //   return axios.get(AppConstants.API_URL + 'all', { responseType: 'text' });
    // }

    // getUserBoard() {
    //   return axios.get(AppConstants.API_URL + 'user', { responseType: 'text' });
    // }

    // getModeratorBoard() {
    //   return axios.get(AppConstants.API_URL + 'mod', { responseType: 'text' });
    // }

    // getAdminBoard() {
    //   return axios.get(AppConstants.API_URL + 'admin', { responseType: 'text' });
    // }

    default:
      return state;
  }
}
