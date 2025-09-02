import type { Comment } from '../features/posts/postsSlice';
import formatDate from '../utils/formatDate';

export const CommentComponent = ({ comment }: { comment: Comment }) => {
  return (
    <div style={{ borderBottom: '1px solid #ddd', padding: '0.5rem 0' }}>
      <p>{comment.text}</p>
      <small>
        {comment.author} | {formatDate(comment.date)}
      </small>
    </div>
  );
}
