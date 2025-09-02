import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../store/store';
import { fetchPosts, deletePost } from '../../postsSlice';
import { PostCard } from '../../../../components/PostCard/PostCard';
import { Link } from 'react-router-dom';
import commonStyles from '../../../../styles/common.module.css';
import styles from './PostListPage.module.css';

export default function PostListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm('Delete post?')) {
      dispatch(deletePost(id));
    }
  };

  return (
    <div className={commonStyles.container}>
      <h1 className={styles.title}>List of Posts</h1>
      {loading && <p className={styles.loading}>Loading...</p>}
      {!loading && items.length === 0 && <p className={styles.noPosts}>No posts available.</p>}
      {error && <p className={commonStyles.error}>{error}</p>}
      {!loading && !error && items.map((post) => (
        <div key={post.id} className={styles.postWrapper}>
          <PostCard post={post} />
          <div className={styles.actions}>
            <Link to={`/post/${post.id}/edit`} className={styles.editLink}>
              Edit
            </Link>
            <button onClick={() => handleDelete(post.id)} className={styles.deleteButton}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}