import { Table } from './Table.jsx';

/** @type {Meta} */
const meta = {
  title: 'Components/Elements/Table',
  component: Table,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} title
 * @property {string} role
 * @property {string} email
 */

/** @type {User[]} */
const data = [
  {
    id: '1',
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    role: 'Admin',
    email: 'jane.cooper@example.com',
  },
  {
    id: '2',
    name: 'Cody Fisher',
    title: 'Product Directives Officer',
    role: 'Owner',
    email: 'cody.fisher@example.com',
  },
];

/** @typedef {import('./Table.jsx').TableProps<User>} TablePropsType */

/**
 * @param {TablePropsType} props
 * @type {Story<TablePropsType>} */
const Template = (props) => <Table {...props} />;

/** @type {Story<TablePropsType>} */
export const Default = Template.bind({});

Default.args = {
  data,
  columns: [
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Title',
      field: 'title',
    },
    {
      title: 'Role',
      field: 'role',
    },
    {
      title: 'Email',
      field: 'email',
    },
  ],
};
