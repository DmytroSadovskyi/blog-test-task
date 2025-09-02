import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store/store';
import { fetchPosts, deletePost } from '../postsSlice';
import { PostCard } from '../../../components/PostCard';
import { Link } from 'react-router-dom';

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
    <div>
      <h1>List of posts</h1>
      {loading && <p>Loading...</p>}
      {!loading && items.length === 0 && <p>No posts available.</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {items.map((post) => (
        <div key={post.id} style={{ position: 'relative' }}>
          <PostCard post={post} />
          <div style={{ position: 'absolute', top: '0', right: '0' }}>
            <Link to={`/post/${post.id}/edit`} style={{ marginRight: '0.5rem' }}>
              Edit
            </Link>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
