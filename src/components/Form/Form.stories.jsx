import * as React from 'react';

import { Button } from '../Elements';

import { Form } from './Form.jsx';
import { FormDrawer } from './FormDrawer.jsx';
import { InputField } from './InputField.jsx';
import { SelectField } from './SelectField.jsx';
import { TextAreaField } from './TextareaField.jsx';

/**
 * @typedef {Object} FormValues
 * @property {string} title
 * @property {string} description
 * @property {string} type
 * @property {string} content
 */



const MyForm = (/** @type {{ hideSubmit?: boolean }} */{ hideSubmit = false }) => {
  return (
    <Form
      onSubmit={async (values) => {
        alert(JSON.stringify(values, null, 2));
      }}
      id="my-form"
    >
      {({ register, formState }) => (
        <>
          <InputField
            label="Title"
              // @ts-ignore
            error={formState.errors['title']}
            registration={register('title')}
          />
          <TextAreaField
            label="Description"
              // @ts-ignore
            error={formState.errors['description']}
            registration={register('description')}
          />
          <SelectField
            label="Team"
              // @ts-ignore
            error={formState.errors['type']}
            registration={register('type')}
            options={['A', 'B', 'C'].map((type) => ({
              label: type,
              value: type,
            }))}
          />

          {!hideSubmit && (
            <div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          )}
        </>
      )}
    </Form>
  );
};

/** @type {Meta} */
const meta = {
  title: 'Components/Form',
  component: MyForm,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

/** @type {NonGenericStory} */
const Template= () => <MyForm />;

export const Default = Template.bind({});
Default.args = {};

export const AsFormDrawer = () => {
  return (
    <FormDrawer
      triggerButton={<Button>Open Form</Button>}
      isDone={true}
      title="My Form"
      size="lg"
      submitButton={
        <Button form="my-form" type="submit">
          Submit
        </Button>
      }
    >
      <MyForm hideSubmit />
    </FormDrawer>
  );
};
