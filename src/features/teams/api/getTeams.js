import { useQuery } from 'react-query';

import { axios } from '@/lib/axios.js';

/** @type {() => Promise<Team[]>} */
export const getTeams = () => {
  return axios.get('/teams');
};

/** @typedef {() => Promise<Team[]>} QueryFnType */

/**
 * @typedef {Object} UseTeamsOptions
 * @property {import('@/lib/react-query.js').QueryConfig<QueryFnType>} [config]
 */

// TODO type this
export const useTeams = ({ config = {} } = ({})) => {
  return useQuery(/** @type {UseTeamsOptions} props */ {
    ...config,
    queryKey: ['teams'],
    queryFn: () => getTeams(),
  });
};

//TODO write about this in thesis
