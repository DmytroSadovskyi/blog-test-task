import { Link } from 'react-router-dom';
import type { Post } from '../../redux/postsSlice';
import formatDate from '../../utils/formatDate';
import styles from './PostCard.module.css';

export const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h2>
      <p className={styles.content}>{post.content}</p>
      <small className={styles.meta}>
        Author: {post.author} | {formatDate(post.postedAt)}
      </small>
    </div>
  );
}
