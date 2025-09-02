import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store/store';
import { fetchPostById, addComment } from '../postsSlice';
import { PostDetail } from '../components/PostDetail';
import { CommentForm } from '../../../components/CommentForm';

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const post = useSelector((state: RootState) => state.posts.items.find((p) => String(p.id) === id));

  console.log(post)

  useEffect(() => {
    if (id) dispatch(fetchPostById(id));
  }, [dispatch, id]);

  if (!post) return <p>Loading post...</p>;

  const handleAddComment = (author: string, text: string) => {
    if (id) dispatch(addComment({ postId: id, comment: { author, text, createdAt: new Date().toISOString() } }));
  };

  return (
    <div>
      <PostDetail post={post} />
      <CommentForm onSubmit={handleAddComment} />
    </div>
  );
}
