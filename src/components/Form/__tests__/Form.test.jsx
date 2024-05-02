import * as z from 'zod';

import { Button } from '@/components/Elements/Button';
import { rtlRender, screen, waitFor, userEvent } from '@/test/test-utils.js';

import { Form } from '../Form';
import { InputField } from '../InputField';

/**
 * Typ testovacích dát.
 * @typedef {Object} TestData
 * @property {string} title - Názov
 */

/**
 * Schéma pre validáciu testovacích dát.
 * @type {import('zod').ZodObject<{ title: import('zod').ZodString }>}
 */
const schema = z.object({
  title: z.string().min(1, 'Required'),
});

/**
 * Testuje zobrazenie a odoslanie základného komponentu Form.
 * @param {import('zod').Infer<typeof schema>} testData - Testovacie dáta.
 */
test('should render and submit a basic Form component', async (testData) => {
  const handleSubmit = jest.fn();

  rtlRender(
      <Form onSubmit={handleSubmit} schema={schema} id="my-form">
        {({ register, formState }) => (
            <>
              <InputField
                  label="Title"
                  // @ts-ignore
                  error={formState.errors['title']}
                  registration={register('title')}
              />

              <Button name="submit" type="submit" className="w-full">
                Submit
              </Button>
            </>
        )}
      </Form>
  );

  userEvent.type(screen.getByLabelText(/title/i), testData.title);

  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith(testData, expect.anything()));
});

/**
 * Testuje, že odoslanie zlyhá, ak validácia zlyhá.
 */
test('should fail submission if validation fails', async () => {
  const handleSubmit = jest.fn();

  rtlRender(
      <Form onSubmit={handleSubmit} schema={schema} id="my-form">
        {({ register, formState }) => (
            <>
              <InputField
                  label="Title"
                  // @ts-ignore
                  error={formState.errors['title']}
                  registration={register('title')}
              />

              <Button name="submit" type="submit" className="w-full">
                Submit
              </Button>
            </>
        )}
      </Form>
  );

  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await screen.findByRole(/alert/i, { name: /required/i });

  expect(handleSubmit).toHaveBeenCalledTimes(0);
});
