import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';

/**
 * @param {{ discussionId: string }} props
 * @returns {Promise<Discussion>}
 */
export const getDiscussion = ({ discussionId }) => {
  return axios.get(`/discussions/${discussionId}`);
};

/** @typedef {typeof getDiscussion} QueryFnType */

/** @typedef {{
 * discussionId: string;
 * config?: import('@/lib/react-query').QueryConfig<QueryFnType>;
 * }} UseDiscussionOptions */

/** @param {UseDiscussionOptions} options */
export const useDiscussion = ({ discussionId, config }) => {
  return useQuery({
    ...config,
    queryKey: ['discussion', discussionId],
    queryFn: () => getDiscussion({ discussionId }),
  });
};
