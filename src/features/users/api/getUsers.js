import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';

/** @returns {Promise<User[]>} */
export const getUsers = () => {
  return axios.get(`/users`);
};

/** @typedef {typeof getUsers} QueryFnType */

/** @typedef {{ config?: import('@/lib/react-query').QueryConfig<QueryFnType> }} UseUsersOptions */

// TODO
export const useUsers = (/** @type {UseUsersOptions} */{ config } = {}) => {
  // @ts-ignore
  return useQuery({
    ...config,
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });
};
