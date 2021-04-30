import axios from 'axios';
import { AppConstants } from '../../config/AppConstants';

export const AuthService = {
  login(credentials) {
    return axios.post(AppConstants.AUTH_API + 'signin', {
      email: credentials.username,
      password: credentials.password,
    });
  },

  register(user) {
    return axios.post(AppConstants.AUTH_API + 'signup', {
      displayName: user.displayName,
      email: user.email,
      password: user.password,
      matchingPassword: user.matchingPassword,
      socialProvider: 'LOCAL',
    });
  },
};
