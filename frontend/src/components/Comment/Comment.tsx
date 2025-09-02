import type { Comment } from '../../features/posts/postsSlice';
import formatDate from '../../utils/formatDate';
import styles from './Comment.module.css';

export const CommentComponent = ({ comment }: { comment: Comment }) => {
  return (
    <div className={styles.comment}>
      <p className={styles.text}>{comment.text}</p>
      <small className={styles.meta}>
        {comment.author} | {formatDate(comment.createdAt)}
      </small>
    </div>
  );
};