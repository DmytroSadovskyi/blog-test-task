import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../store/store';
import { fetchPostById, addComment } from '../../postsSlice';
import { PostDetail } from '../../components/PostDetail/PostDetail';
import { CommentForm } from '../../../../components/CommentForm/CommentForm';
import commonStyles from '../../../../styles/common.module.css';

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const post = useSelector((state: RootState) => state.posts.items.find((p) => String(p.id) === id));

  useEffect(() => {
    if (id) dispatch(fetchPostById(id));
  }, [dispatch, id]);

  if (!post) return <p className={commonStyles.container}>Loading post...</p>;

  const handleAddComment = (author: string, text: string) => {
    if (id) dispatch(addComment({ postId: id, comment: { author, text, createdAt: new Date().toISOString() } }));
  };

  return (
    <div className={commonStyles.container}>
      <Link to={`/`} className={commonStyles.backLink}>
        Back to Posts
      </Link>
      <PostDetail post={post} />
      <CommentForm onSubmit={handleAddComment} />
    </div>
  );
}