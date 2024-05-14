import { MDPreview } from './MDPreview.jsx';

/** @type {Meta} */
const meta = {
  title: 'Components/Elements/MDPreview',
  component: MDPreview,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

/** @typedef {import('./MDPreview').MDPreviewProps} MDPreviewPropsType */

/**
 * @param props {MDPreviewPropsType}
 * @type {Story<MDPreviewPropsType>}
 */
const Template = (props) => <MDPreview {...props} />;

/** @type {Story<MDPreviewPropsType>} */
export const Default = Template.bind({});
Default.args = {
  value: `## Hello World`,
};
