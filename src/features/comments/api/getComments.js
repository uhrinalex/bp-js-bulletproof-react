import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';

/**
* @param {{ discussionId: string }} props
* @returns {Promise<CommentType[]>}
*/
export const getComments = ({ discussionId }) => {
  return axios.get(`/comments`, {
    params: {
      discussionId,
    },
  });
};

/** @typedef {() => Promise<CommentType[]>} QueryFnType */

/**
 * @typedef {Object} UseCommentsOptions
 * @property {string} discussionId
 * @property {import('@/lib/react-query.js').QueryConfig<QueryFnType>} [config]
 */

// /** @param {UseCommentsOptions} props */
// export const useComments = ({ discussionId, config }) => {
//   return useQuery({
//     queryKey: ['comments', discussionId],
//     queryFn: () => getComments({ discussionId }),
//     ...config,
//   });
// };

// TODO
/**
 * Hook for fetching comments for a discussion.
 * @param {UseCommentsOptions} props - Options for the hook.
 * @returns {import('react-query').UseQueryResult<CommentType[], any>} The query result.
 */
export const useComments = ({ discussionId, config }) => {
  // @ts-ignore
  return useQuery(['comments', discussionId], () => getComments({ discussionId }), config);
};
