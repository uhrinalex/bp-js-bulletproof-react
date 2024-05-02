import { CommentsList } from './CommentsList.jsx';
import { CreateComment } from './CreateComment.jsx';

/** @typedef {{ discussionId: string }} CommentsProps */

/** @param {CommentsProps} props */
export const Comments = ({ discussionId }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-1xl font-bold">Comments:</h3>
        <CreateComment discussionId={discussionId} />
      </div>
      <CommentsList discussionId={discussionId} />
    </div>
  );
};
