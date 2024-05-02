import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

/** @typedef {{
 * data: {
 *  body: string;
 *  discussionId: string;
 *  }
 * }} CreateCommentDTO
 */

/**
 *
 * @param {CreateCommentDTO} props
 * @returns {Promise<CommentType>}
 */
export const createComment = ({ data }) => {
  return axios.post('/comments', data);
};

/** @typedef {{
 * discussionId: string;
 * config?: import('@/lib/react-query').MutationConfig<typeof createComment>;
 }} UseCreateCommentOptions */

/** @param {UseCreateCommentOptions} props */
export const useCreateComment = ({ config, discussionId }) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (newComment) => {
      await queryClient.cancelQueries(['comments', discussionId]);

      /** @type {CommentType[] | undefined} */
      const previousComments = queryClient.getQueryData(['comments', discussionId]);

      queryClient.setQueryData(
        ['comments', discussionId],
        [...(previousComments || []), newComment.data]
      );

      return { previousComments };
    },
    onError: (_, __, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(['comments', discussionId], context.previousComments);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', discussionId]);
      addNotification({
        type: 'success',
        title: 'Comment Created',
      });
    },
    ...config,
    mutationFn: createComment,
  });
};
