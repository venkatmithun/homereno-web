import axios from 'axios';
import { AppConstants } from '../../config/AppConstants';

export const UserService = {
  getPublicContent() {
    return axios.get(AppConstants.API_URL + 'all', { responseType: 'text' });
  },

  getUserBoard() {
    return axios.get(AppConstants.API_URL + 'user', { responseType: 'text' });
  },

  getModeratorBoard() {
    return axios.get(AppConstants.API_URL + 'mod', { responseType: 'text' });
  },

  getAdminBoard() {
    return axios.get(AppConstants.API_URL + 'admin', { responseType: 'text' });
  },

  getCurrentUser(token) {
    return axios.get(AppConstants.API_URL + 'user/me');
  },
};
