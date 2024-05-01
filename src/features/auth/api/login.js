import { axios } from '@/lib/axios.js';

/** @typedef {{
 * email: string,
 * password: string
 * }} LoginCredentialsDTO
 */

/**
 * @param {LoginCredentialsDTO} data
 * @returns {Promise<UserResponse>}
 */
export const loginWithEmailAndPassword = (data) => {
  return axios.post('/auth/login', data);
};
