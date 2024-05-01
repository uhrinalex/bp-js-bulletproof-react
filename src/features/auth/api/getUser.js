import { axios } from '@/lib/axios.js';


/** @returns {Promise<AuthUser>} */
export const getUser = () => {
  return axios.get('/auth/me');
};
