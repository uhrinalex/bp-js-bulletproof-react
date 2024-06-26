import { PencilIcon } from '@heroicons/react/solid';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { useDiscussion } from '../api/getDiscussion.js';
import { useUpdateDiscussion } from '../api/updateDiscussion.js';


/** @typedef {{ discussionId: string }} UpdateDiscussionProps */

const schema = z.object({
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
});

/** @param {UpdateDiscussionProps} props */
export const UpdateDiscussion = ({ discussionId }) => {
  const discussionQuery = useDiscussion({ discussionId });
  const updateDiscussionMutation = useUpdateDiscussion();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateDiscussionMutation.isSuccess}
        triggerButton={
          <Button startIcon={<PencilIcon className="h-4 w-4" />} size="sm">
            Update Discussion
          </Button>
        }
        title="Update Discussion"
        submitButton={
          <Button
            form="update-discussion"
            type="submit"
            size="sm"
            isLoading={updateDiscussionMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form
          id="update-discussion"
          onSubmit={async (values) => {
            const param = /** @type {import('../api/updateDiscussion.js').UpdateDiscussionDTO} */({ data: values, discussionId });
            await updateDiscussionMutation.mutateAsync(param);
          }}
          options={{
            defaultValues: {
              title: discussionQuery.data?.title,
              body: discussionQuery.data?.body,
            },
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <InputField
                label="Title"
                error={formState.errors['title']}
                registration={register('title')}
              />
              <TextAreaField
                label="Body"
                error={formState.errors['body']}
                registration={register('body')}
              />
            </>
          )}
        </Form>
      </FormDrawer>
    </Authorization>
  );
};

// <UpdateDiscussionDTO['data'], typeof schema>
