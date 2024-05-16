import { PlusIcon } from '@heroicons/react/outline';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { useCreateDiscussion } from '../api/createDiscussion.js';

const schema = z.object({
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
});

export const CreateDiscussion = () => {
  const createDiscussionMutation = /** @type{ import('react-query').UseMutationResult<Discussion, import('axios').AxiosError<any>, import('../api/createDiscussion.js').CreateDiscussionDTO, any>} */(useCreateDiscussion());

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createDiscussionMutation.isSuccess}
        triggerButton={
          <Button size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
            Create Discussion
          </Button>
        }
        title="Create Discussion"
        submitButton={
          <Button
            form="create-discussion"
            type="submit"
            size="sm"
            isLoading={createDiscussionMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form
          id="create-discussion"
          onSubmit={async (values) => {
            const param = /** @type {import('../api/createDiscussion.js').CreateDiscussionDTO} */({ data: values });
            await createDiscussionMutation.mutateAsync(param);
          }}
          schema={schema}
        >
          {({ register, formState }) => (
              <>
                <InputField
                  label="Title"
                  error={/** @type {FieldError | undefined} */(formState.errors['title'])}
                  registration={register('title')}
                />

                <TextAreaField
                  label="Body"
                  error={/** @type {FieldError | undefined} */(formState.errors['body'])}
                  registration={register('body')}
                />
              </>
            )
          }
        </Form>
      </FormDrawer>
    </Authorization>
  );
};

// <CreateDiscussionDTO['data'], typeof schema>
