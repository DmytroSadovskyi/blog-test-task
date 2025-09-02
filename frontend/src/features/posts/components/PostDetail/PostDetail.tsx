import type { Post } from '../../postsSlice';
import { CommentComponent } from '../../../../components/Comment/Comment';
import formatDate from '../../../../utils/formatDate';
import commonStyles from '../../../../styles/common.module.css';
import styles from './PostDetail.module.css';

export const PostDetail = ({ post }: { post: Post }) => {
  return (
    <div className={commonStyles.container}>
      <div className={styles.post}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.content}>{post.content}</p>
        <small className={styles.meta}>
          Author: {post.author} | {formatDate(post.postedAt)}
        </small>
      </div>
      <h2 className={styles.commentsTitle}>Comments</h2>
      {post.comments.length === 0 && <p className={styles.noComments}>No comments yet.</p>}
      <div className={styles.comments}>
        {post.comments.map((c) => (
          <CommentComponent key={c.id} comment={c} />
        ))}
      </div>
    </div>
  );
}
