import { axios } from '@/lib/axios.js';

/** @typedef {{
 *   email: string;
 *   password: string;
 *   firstName: string;
 *   lastName: string;
 *   }} RegisterCredentialsDTO
 */

/**
 * @param {RegisterCredentialsDTO} data
 * @returns {Promise<UserResponse>}
 */
export const registerWithEmailAndPassword = (data) => {
  return axios.post('/auth/register', data);
};
