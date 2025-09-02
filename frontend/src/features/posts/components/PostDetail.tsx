import type { Post } from '../postsSlice';
import { CommentComponent } from '../../../components/Comment';

export const PostDetail = ({ post }: { post: Post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <small>
        Author: {post.author} | {post.date}
      </small>

      <h3 style={{ marginTop: '1.5rem' }}>Comments</h3>
      {post.comments.length === 0 && <p>There are no comments yet</p>}
      {post.comments.map((c) => (
        <CommentComponent key={c.id} comment={c} />
      ))}
    </div>
  );
}
