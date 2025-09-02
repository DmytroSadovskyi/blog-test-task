import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store/store';
import { createPost } from '../postsSlice';
import { PostForm } from '../components/PostForm';
import { useNavigate } from 'react-router-dom';

export default function PostCreatePage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (data: { title: string; content: string; author: string }) => {
    dispatch(createPost({...data}));
    navigate('/');
  };

  return (
    <div>
      <h1>Create Post</h1>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
}
