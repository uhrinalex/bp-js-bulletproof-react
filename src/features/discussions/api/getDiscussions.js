import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';

/** @returns {Promise<Discussion[]>} */
export const getDiscussions = () => {
  return axios.get('/discussions');
};

/** @typedef {typeof getDiscussions} QueryFnType */

/** @typedef {{ config?: QueryConfig<QueryFnType> }} UseDiscussionsOptions */

/** @param {UseDiscussionsOptions} props */
export const useDiscussions = ({ config } = {}) => {
  return useQuery({
    ...config,
    queryKey: ['discussions'],
    queryFn: () => getDiscussions(),
  });
};
