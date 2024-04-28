import { Button } from '../Button';

import { ConfirmationDialog } from './ConfirmationDialog.jsx';

/** @type {Meta} */
const meta = {
  title: 'Components/Elements/ConfirmationDialog',
  component: ConfirmationDialog,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

/** @typedef {import('./ConfirmationDialog').ConfirmationDialogProps} ConfirmationDialogPropsType */

/**
 * @param props {ConfirmationDialogPropsType}
 * @type {Story<ConfirmationDialogPropsType>}
 */
const Template = (props) => <ConfirmationDialog {...props} />;

/** @type {Story<ConfirmationDialogPropsType>} */
export const Danger = Template.bind({});
Danger.args = {
  icon: 'danger',
  title: 'Confirmation',
  body: 'Hello World',
  confirmButton: <Button className="bg-red-500">Confirm</Button>,
  triggerButton: <Button>Open</Button>,
};

/** @type {Story<ConfirmationDialogPropsType>} */
export const Info = Template.bind({});
Info.args = {
  icon: 'info',
  title: 'Confirmation',
  body: 'Hello World',
  confirmButton: <Button>Confirm</Button>,
  triggerButton: <Button>Open</Button>,
};
