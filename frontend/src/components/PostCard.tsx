import { Link } from 'react-router-dom';
import type { Post } from '../features/posts/postsSlice';
import formatDate from '../utils/formatDate';

export const PostCard = ({ post }: { post: Post }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h2>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h2>
      <p>{post.content}</p>
      <small>
        Author: {post.author} | {formatDate(post.postedAt)}
      </small>
    </div>
  );
}
