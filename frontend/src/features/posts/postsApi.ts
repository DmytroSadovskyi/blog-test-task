import api from '../../services/api';
import type { Post, Comment } from './postsSlice';

const postsApi = {
  async getPosts(): Promise<Post[]> {
    const res = await api.get('/posts');
    return res.data;
  },
  async getPostById(id: string): Promise<Post> {
    const res = await api.get(`/posts/${id}`);
    return res.data;
  },
  async createPost(post: Omit<Post, 'id' | 'comments'>): Promise<Post> {
    const res = await api.post('/posts', { ...post, comments: [] });
    return res.data;
  },
  async updatePost(post: Post): Promise<Post> {
    const res = await api.put(`/posts/${post.id}`, post);
    return res.data;
  },
  async deletePost(id: string): Promise<void> {
    await api.delete(`/posts/${id}`);
  },
  async addComment(postId: string, comment: Omit<Comment, 'id'>): Promise<Post> {
    const res = await api.post(`/posts/${postId}/comments`, comment);
    return res.data;
  },
};

export default postsApi;
