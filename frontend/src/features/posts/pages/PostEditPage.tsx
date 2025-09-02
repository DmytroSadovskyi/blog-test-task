import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store/store';
import { fetchPostById, updatePost } from '../postsSlice';
import { PostForm } from '../components/PostForm';

export default function PostEditPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const post = useSelector((state: RootState) => state.posts.items.find((p) => p.id === id));

  useEffect(() => {
    if (id && !post) dispatch(fetchPostById(id));
  }, [dispatch, id, post]);

  if (!post) return <p>Loading post...</p>;

  const handleSubmit = (data: { title: string; content: string; author: string }) => {
    dispatch(updatePost({ ...post, ...data }));
    navigate(`/post/${id}`);
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <PostForm initialData={post} onSubmit={handleSubmit} />
    </div>
  );
}
