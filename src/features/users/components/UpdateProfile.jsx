import { PencilIcon } from '@heroicons/react/solid';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, TextAreaField } from '@/components/Form';
import { useAuth } from '@/lib/auth';

import { useUpdateProfile } from '../api/updateProfile';

const schema = z.object({
  email: z.string().min(1, 'Required'),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  bio: z.string(),
});

/**
 * @typedef {import('react-query').UseMutationResult<import('axios').AxiosResponse<any>, import('axios').AxiosError<any>, import('../api/updateProfile').UpdateProfileDTO, unknown>} useUpdateProfileType
 */

/** @returns {JSX.Element} */
export const UpdateProfile = () => {
  const { user } = useAuth();
  const updateProfileMutation = /** @type { useUpdateProfileType } */(useUpdateProfile());

  return (
    <FormDrawer
      isDone={updateProfileMutation.isSuccess}
      triggerButton={
        <Button startIcon={<PencilIcon className="h-4 w-4" />} size="sm">
          Update Profile
        </Button>
      }
      title="Update Profile"
      submitButton={
        <Button
          form="update-profile"
          type="submit"
          size="sm"
          isLoading={updateProfileMutation.isLoading}
        >
          Submit
        </Button>
      }
    >
      <Form
        id="update-profile"
        onSubmit={async (values) => {
          const param = /** @type {import('../api/updateProfile').UpdateProfileDTO} */({ data: values });
          await updateProfileMutation.mutateAsync(param);
        }}
        options={{
          defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            bio: user?.bio,
          },
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              label="First Name"
              error={formState.errors['firstName']}
              registration={register('firstName')}
            />
            <InputField
              label="Last Name"
              error={formState.errors['lastName']}
              registration={register('lastName')}
            />
            <InputField
              label="Email Address"
              type="email"
              error={formState.errors['email']}
              registration={register('email')}
            />

            <TextAreaField
              label="Bio"
              error={formState.errors['bio']}
              registration={register('bio')}
            />
          </>
        )}
      </Form>
    </FormDrawer>
  );
};

// <UpdateProfileDTO['data'], typeof schema>
