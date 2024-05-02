import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

/** @param {{ commentId: string}} props */
export const deleteComment = ({ commentId }) => {
  return axios.delete(`/comments/${commentId}`);
};

/** @typedef {{
 * discussionId: string;
 * config?: import('@/lib/react-query').MutationConfig<typeof deleteComment>;
 }} UseDeleteCommentOptions */

/** @param {UseDeleteCommentOptions} props */
export const useDeleteComment = ({ config, discussionId }) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (deletedComment) => {
      await queryClient.cancelQueries(['comments', discussionId]);

      /** @type {CommentType[] | undefined} */
      const previousComments = queryClient.getQueryData(['comments', discussionId]);

      queryClient.setQueryData(
        ['comments', discussionId],
        previousComments?.filter((comment) => comment.id !== deletedComment.commentId)
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
        title: 'Comment Deleted',
      });
    },
    ...config,
    mutationFn: deleteComment,
  });
};
