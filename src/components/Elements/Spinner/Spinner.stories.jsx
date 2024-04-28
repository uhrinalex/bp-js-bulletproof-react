import { Spinner } from './Spinner';

/** @type {Meta} */
const meta = {
  title: 'Components/Elements/Spinner',
  component: Spinner,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

/** @typedef {import('./Spinner').SpinnerProps} SpinnerPropsType */

/**
 * @param props {SpinnerPropsType}
 * @type {Story<SpinnerPropsType>}
*/
const Template = (props) => <Spinner {...props} />;

export const Default = Template.bind({});
Default.args = {};
