import { Link } from 'react-router-dom';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { useAuth } from '@/lib/auth.jsx';

const schema = z.object({
  email: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

/** @typedef {{
 * email: string;
 * password: string;
 * }} LoginValues
 */

/** @typedef {{
 * onSuccess: () => void;
 * }} LoginFormProps
 */

/** @param {LoginFormProps} props */
export const LoginForm = ({ onSuccess }) => {
  const { login, isLoggingIn } = useAuth();

  return (
    <div>
      <Form
        onSubmit={async (values) => {
          await login(values);
          onSuccess();
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="email"
              label="Email Address"
                // @ts-ignore
              error={formState.errors['email']}
              registration={register('email')}
            />
            <InputField
              type="password"
              label="Password"
                // @ts-ignore
              error={formState.errors['password']}
              registration={register('password')}
            />
            <div>
              <Button isLoading={isLoggingIn} type="submit" className="w-full">
                Log in
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link to="../register" className="font-medium text-blue-600 hover:text-blue-500">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
