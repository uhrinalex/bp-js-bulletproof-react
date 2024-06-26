import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

/** @typedef {{
 * data: {
 *  title: string;
 *  body: string;
 *  };
 *  discussionId: string;
 * }} UpdateDiscussionDTO */

/**
 * @param {UpdateDiscussionDTO} props
 * @returns {Promise<Discussion>}
 */
export const updateDiscussion = ({data, discussionId}) => {
  return axios.patch(`/discussions/${discussionId}`, data);
};

/** @typedef {{ config?: import('@/lib/react-query').MutationConfig<typeof updateDiscussion> }} UseUpdateDiscussionOptions */

/** @param {UseUpdateDiscussionOptions} props */
export const useUpdateDiscussion = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (/** @type {any} */updatingDiscussion) => {
      await queryClient.cancelQueries(['discussion', updatingDiscussion?.discussionId]);

      /** @type {Discussion | undefined} */
      const previousDiscussion = queryClient.getQueryData([
        'discussion',
        updatingDiscussion?.discussionId,
      ]);

      queryClient.setQueryData(['discussion', updatingDiscussion?.discussionId], {
        ...previousDiscussion,
        ...updatingDiscussion.data,
        id: updatingDiscussion.discussionId,
      });

      return { previousDiscussion };
    },
    onError: (_, __, /** @type {any} */context) => {
      if (context?.previousDiscussion) {
        queryClient.setQueryData(
          ['discussion', context.previousDiscussion.id],
          context.previousDiscussion
        );
      }
    },
    onSuccess: (/** @type {Discussion} */data) => {
      queryClient.refetchQueries(['discussion', data.id]);
      addNotification({
        type: 'success',
        title: 'Discussion Updated',
      });
    },
    ...config,
    mutationFn: updateDiscussion,
  });
};
