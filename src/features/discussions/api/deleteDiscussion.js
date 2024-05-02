import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

/** @param {{ discussionId: string }} props */
export const deleteDiscussion = ({ discussionId }) => {
  return axios.delete(`/discussions/${discussionId}`);
};

/** @typedef {{ config?: MutationConfig<typeof deleteDiscussion> }} UseDeleteDiscussionOptions */

/** @param {UseDeleteDiscussionOptions} props */
export const useDeleteDiscussion = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (deletedDiscussion) => {
      await queryClient.cancelQueries('discussions');

      // TODO maybe write about this in thesis
      /** @type {Discussion[] | undefined} */
      const previousDiscussions = queryClient.getQueryData('discussions');

      queryClient.setQueryData(
        'discussions',
        previousDiscussions?.filter(
          (discussion) => discussion.id !== deletedDiscussion.discussionId
        )
      );

      return { previousDiscussions };
    },
    onError: (_, __, /** @type {any} */context) => {
      if (context?.previousDiscussions) {
        queryClient.setQueryData('discussions', context.previousDiscussions);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('discussions');
      addNotification({
        type: 'success',
        title: 'Discussion Deleted',
      });
    },
    ...config,
    mutationFn: deleteDiscussion,
  });
};
