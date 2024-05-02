import { ContentLayout } from '@/components/Layout';

import { CreateDiscussion } from '../components/CreateDiscussion.jsx';
import { DiscussionsList } from '../components/DiscussionsList.jsx';

export const Discussions = () => {
  return (
    <ContentLayout title="Discussions">
      <div className="flex justify-end">
        <CreateDiscussion />
      </div>
      <div className="mt-4">
        <DiscussionsList />
      </div>
    </ContentLayout>
  );
};
