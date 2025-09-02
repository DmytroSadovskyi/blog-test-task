import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../store/store';
import { createPost } from '../../postsSlice';
import { PostForm } from '../../components/PostForm/PostForm';
import { useNavigate } from 'react-router-dom';
import commonStyles from '../../../../styles/common.module.css';
import styles from './PostCreatePage.module.css';

export default function PostCreatePage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (data: { title: string; content: string; author: string }) => {
   await dispatch(createPost({ ...data }));
    navigate('/');
  };

  return (
    <div className={commonStyles.container}>
      <h1 className={styles.title}>Create Post</h1>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
}