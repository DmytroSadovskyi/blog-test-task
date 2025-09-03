import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDebounce } from 'use-debounce';
import type { RootState, AppDispatch } from '../../redux/store';
import { fetchPosts, deletePost, setPage } from '../../redux/postsSlice';
import { PostCard } from '../../components/PostCard/PostCard';
import { Link } from 'react-router-dom';
import commonStyles from '../../styles/common.module.css';
import styles from './PostListPage.module.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';

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


  const handlePrevious = () => {
    if (page > 1) dispatch(setPage(page - 1));
  };

  const handleNext = () => {
    if (page < totalPages) dispatch(setPage(page + 1));
  };


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
       {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={`${commonStyles.button} ${styles.paginationButton}`}
            onClick={handlePrevious}
            disabled={page === 1}
            aria-label="Previous page"
          >
            Previous
          </button>
          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={`${commonStyles.button} ${styles.paginationButton} ${num === page ? styles.active : ''}`}
                onClick={() => dispatch(setPage(num))}
                disabled={num === page}
                aria-current={num === page ? 'page' : undefined}
                aria-label={`Page ${num}`}
              >
                {num}
              </button>
            ))}
          </div>
          <button
            className={`${commonStyles.button} ${styles.paginationButton}`}
            onClick={handleNext}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}