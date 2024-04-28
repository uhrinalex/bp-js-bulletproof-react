import { Button} from './Button.jsx';

/** @type {Meta} */
const meta = {
  title: 'Components/Elements/Button',
  component: Button,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

/** @typedef {import('./Button').ButtonProps} ButtonPropsType */

/**
 * @param props {ButtonPropsType}
 * @type {Story<ButtonPropsType>}
 */
const Template= (props) => <Button {...props} />;

/** @type {Story<ButtonPropsType>} */
export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary Button',
  variant: 'primary',
};

/** @type {Story<ButtonPropsType>} */
export const Inverse = Template.bind({});
Inverse.args = {
  children: 'Inverse Button',
  variant: 'inverse',
};

/** @type {Story<ButtonPropsType>} */
export const Danger = Template.bind({});
Danger.args = {
  children: 'Danger Button',
  variant: "danger",
};
