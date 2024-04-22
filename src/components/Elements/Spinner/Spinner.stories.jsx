import { Spinner } from './Spinner';

/** @type {import('@storybook/react').Meta} */
const meta = {
  title: 'Components/Elements/Spinner',
  component: Spinner,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

/**
 * @template {import('@storybook/addons').Args} TProps
 * @typedef {import('@storybook/react').Story<TProps>} Story
 */

/** @typedef {import('./Spinner').SpinnerProps} SpinnerProps */

/**
 * @param props {SpinnerProps}
 * @type {Story<SpinnerProps>}
*/
const Template = (props) => <Spinner {...props} />;

export const Default = Template.bind({});
Default.args = {};
