import { useMutation } from 'react-query';

import { useAuth } from '@/lib/auth';
import { axios } from '@/lib/axios';
import { useNotificationStore } from '@/stores/notifications';

/** @typedef {{
 *  data: {
 *   email: string;
 *   firstName: string;
 *   lastName: string;
 *   bio: string;
 *  };
 * }} UpdateProfileDTO */

/** @param {UpdateProfileDTO} props */
export const updateProfile = ({ data }) => {
  return axios.patch(`/users/profile`, data);
};

/** @typedef {{config?: import('@/lib/react-query').MutationConfig<typeof updateProfile>}} UseUpdateProfileOptions */

/** @param {UseUpdateProfileOptions} props */
export const useUpdateProfile = ({ config } = {}) => {
  const { addNotification } = useNotificationStore();
  const { refetchUser } = useAuth();
  return useMutation({
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'User Updated',
      });
      refetchUser();
    },
    ...config,
    mutationFn: updateProfile,
  });
};
