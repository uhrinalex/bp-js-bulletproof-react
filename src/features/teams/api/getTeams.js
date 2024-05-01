import { useQuery } from 'react-query';

import { axios } from '@/lib/axios.js';

/** @returns {Promise<Team[]>} */
export const getTeams = () => {
  return axios.get('/teams');
};

/** @typedef {typeof getTeams} QueryFnType */

/** @typedef {{
 * config?: import('@/lib/react-query.js').QueryConfig<QueryFnType>;
 * }} UseTeamsOptions
 */

/** @param {UseTeamsOptions} props */
export const useTeams = ({ config = {} } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['teams'],
    queryFn: () => getTeams(),
  });
};


//TODO opisat v praci maybe?
