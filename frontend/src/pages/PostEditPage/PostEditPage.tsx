import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import { fetchPostById, updatePost } from '../../redux/postsSlice';
import { PostForm } from '../../components/PostForm/PostForm';
import commonStyles from '../../styles/common.module.css';
import styles from './PostEditPage.module.css';

export default function PostEditPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const post = useSelector((state: RootState) => state.posts.data.find((p) => String(p.id) === id));

  useEffect(() => {
    if (id && !post) dispatch(fetchPostById(id));
  }, [dispatch, id, post]);

  if (!post) return <p className={commonStyles.container}>Loading post...</p>;

  const handleSubmit = async (data: { title: string; content: string; author: string }) => {
   await dispatch(updatePost({ ...post, ...data }));
    navigate(`/post/${id}`);
  };

  return (
    <div className={commonStyles.container}>
      <Link to={`/post/${id}`} className={commonStyles.backLink}>
        Back to Post
      </Link>
      <h1 className={styles.title}>Edit Post</h1>
      <PostForm initialData={post} onSubmit={handleSubmit} />
    </div>
  );
}