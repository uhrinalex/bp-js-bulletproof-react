import { Table, TableProps } from './Table.jsx';

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


/**
 * @param {TableProps}
 * @type {Story<TableProps<User>>} */
const Template = (props) => <Table<User> {...props} />;

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
