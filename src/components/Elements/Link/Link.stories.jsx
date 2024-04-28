import { Link } from './Link.jsx';

/** @type {Meta} */
const meta = {
  title: 'Components/Elements/Link',
  component: Link,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

/** @type {NonGenericStory} */
const Template = (props) => (
  <Link to="/" {...props}>
    Hello
  </Link>
);

/** @type {NonGenericStory} */
export const Default = Template.bind({});
Default.args = {};
