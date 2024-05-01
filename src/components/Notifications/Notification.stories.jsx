import { Notification } from './Notification.jsx';

/** @type {Meta} */
const meta= {
  title: 'Components/Notifications',
  component: Notification,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

/** @typedef {import('./Notification.jsx').NotificationProps} NotificationPropsType */

/**
 * @type {Story<NotificationPropsType>}
 * @param {NotificationPropsType} props
 */
const Template = (props) => <Notification {...props} />;

/** @type {Story<NotificationPropsType>} */
export const Info = Template.bind({});
Info.args = {
  notification: {
    id: '1',
    type: 'info',
    title: 'Hello Info',
    message: 'This is info notification',
  },
  onDismiss: (id) => alert(`Dismissing Notification with id: ${id}`),
};

/** @type {Story<NotificationPropsType>} */
export const Success = Template.bind({});
Success.args = {
  notification: {
    id: '1',
    type: 'success',
    title: 'Hello Success',
    message: 'This is success notification',
  },
  onDismiss: (id) => alert(`Dismissing Notification with id: ${id}`),
};

/** @type {Story<NotificationPropsType>} */
export const Warning = Template.bind({});
Warning.args = {
  notification: {
    id: '1',
    type: 'warning',
    title: 'Hello Warning',
    message: 'This is warning notification',
  },
  onDismiss: (id) => alert(`Dismissing Notification with id: ${id}`),
};

/** @type {Story<NotificationPropsType>} */
export const Error = Template.bind({});
Error.args = {
  notification: {
    id: '1',
    type: 'error',
    title: 'Hello Error',
    message: 'This is error notification',
  },
  onDismiss: (id) => alert(`Dismissing Notification with id: ${id}`),
};
