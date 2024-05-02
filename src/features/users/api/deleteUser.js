import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

/** @typedef {{ userId: string }} DeleteUserDTO */

/** @param {DeleteUserDTO} props */
export const deleteUser = ({ userId }) => {
  return axios.delete(`/users/${userId}`);
};

/** @typedef {{config?: import('@/lib/react-query').MutationConfig<typeof deleteUser>}} UseDeleteUserOptions */

// TODO
/** @param {UseDeleteUserOptions} props */
export const useDeleteUser = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (deletedUser) => {
      await queryClient.cancelQueries('users');

      /** @type {User[] | undefined} */
      const previousUsers = queryClient.getQueryData('users');

      queryClient.setQueryData(
        'users',
        previousUsers?.filter((user) => user.id !== deletedUser.userId)
      );

      return { previousUsers };
    },
    onError: (_, __, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData('users', context.previousUsers);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      addNotification({
        type: 'success',
        title: 'User Deleted',
      });
    },
    ...config,
    mutationFn: deleteUser,
  });
};
