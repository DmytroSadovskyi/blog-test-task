import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import postsApi from './postsApi';

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  comments: Comment[];
}

interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
};


export const fetchPosts = createAsyncThunk('posts/fetchAll', postsApi.getPosts);
export const fetchPostById = createAsyncThunk('posts/fetchById', postsApi.getPostById);
export const createPost = createAsyncThunk('posts/create', postsApi.createPost);
export const updatePost = createAsyncThunk('posts/update', postsApi.updatePost);
export const deletePost = createAsyncThunk('posts/delete', postsApi.deletePost);
export const addComment = createAsyncThunk(
  'posts/addComment',
  async ({ postId, comment }: { postId: string; comment: Omit<Comment, 'id'> }) =>
    postsApi.addComment(postId, comment)
);


const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching posts';
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.items.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx >= 0) state.items[idx] = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.meta.arg);
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Post>) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx >= 0) state.items[idx] = action.payload;
      });
  },
});

export default postsSlice.reducer;
