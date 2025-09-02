import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDebounce } from 'use-debounce';
import type { RootState, AppDispatch } from '../../../../store/store';
import { fetchPosts, deletePost, setPage } from '../../postsSlice';
import { PostCard } from '../../../../components/PostCard/PostCard';
import { Link } from 'react-router-dom';
import commonStyles from '../../../../styles/common.module.css';
import styles from './PostListPage.module.css';
import { SearchBar } from '../../../../components/SearchBar/SearchBar';

export default function PostListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, author, limit, page, search, total } = useSelector((state: RootState) => state.posts);

  const [debouncedAuthor] = useDebounce(author, 500);
  const [debouncedSearch] = useDebounce(search, 500);
  
useEffect(() => {
    dispatch(fetchPosts({ author: debouncedAuthor, limit, page, search: debouncedSearch }));
  }, [dispatch, debouncedAuthor, debouncedSearch, limit, page]);

  const handleDelete = (id: string) => {
    if (window.confirm('Delete post?')) {
      dispatch(deletePost(id));
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className={commonStyles.container}>
      <h1 className={styles.title}>List of Posts</h1>

      <SearchBar/>

      {loading && <p className={styles.loading}>Loading...</p>}
      {!loading && data?.length === 0 && <p className={styles.noPosts}>No posts available.</p>}
      {error && <p className={commonStyles.error}>{error}</p>}
      {!loading && !error && data?.map((post) => (
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
      <div style={{ marginTop: '1rem' }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            disabled={num === page}
            onClick={() => dispatch(setPage(num))}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}