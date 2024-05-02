import { useDisclosure } from '@/hooks/useDisclosure.js';
import { Button } from '../Button';
import { Drawer } from './Drawer.jsx';

/** @type {Meta} */
const meta = {
  title: 'Components/Elements/Drawer',
  component: Drawer,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

// TODO try to rethink
/** @type {NonGenericStory} */
export const Demo= () => {
  const { close, open, isOpen } = useDisclosure();

  return (
    <>
      <Button onClick={open}>Open Drawer</Button>
      <Drawer
        isOpen={isOpen}
        onClose={close}
        title="Sample Drawer"
        size="md"
        renderFooter={() => (
          <>
            <Button variant="inverse" size="sm" onClick={close}>
              Cancel
            </Button>
          </>
        )}
      >
        Hello
      </Drawer>
    </>
  );
};
