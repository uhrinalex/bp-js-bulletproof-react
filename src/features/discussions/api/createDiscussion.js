import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';


/** @typedef {{
 * data: {
 *  title: string;
 *  body: string;
 *  };
 * }} CreateDiscussionDTO
 */

/**
 *
 * @param {CreateDiscussionDTO} props
 * @return {Promise<Discussion>}
 */
export const createDiscussion = ({ data }) => {
  return axios.post(`/discussions`, data);
};

/** @typedef {{ config?: import('@/lib/react-query').MutationConfig<typeof createDiscussion> }} UseCreateDiscussionOptions */

/** @param {UseCreateDiscussionOptions} props */
export const useCreateDiscussion = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();
  return useMutation({
    /** @param {CreateDiscussionDTO} newDiscussion */
    onMutate: async (newDiscussion) => {
      await queryClient.cancelQueries('discussions');

      /** @type {Discussion[] | undefined} */
      const previousDiscussions = queryClient.getQueryData('discussions');

      queryClient.setQueryData('discussions', [...(previousDiscussions || []), newDiscussion.data]);

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
        title: 'Discussion Created',
      });
    },
    ...config,
    mutationFn: createDiscussion,
  });
};
