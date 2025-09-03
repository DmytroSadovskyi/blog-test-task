import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import postsApi, { type AddCommentResponse, type GetPostsResponse } from './postsApi';

export interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  postedAt: string;
  comments: Comment[];
}

interface PostsState {
  data: Post[];
  currentPost: Post | null;
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  error: string | null;
  search: string;
  author: string;
}

const initialState: PostsState = {
  data: [],
  currentPost: null,
  total: 0,
  page: 1,
  limit: 5,
  loading: false,
  error: null,
  search: '',
  author: '',
};

// Thunks
export const fetchPosts = createAsyncThunk<GetPostsResponse, { page?: number; limit?: number; search?: string; author?: string }>(
  'posts/fetchPosts',
  async (query) => {
    return postsApi.getPosts(query);
  }
);

export const fetchPostById = createAsyncThunk<Post, string>('posts/fetchPostById', postsApi.getPostById);
export const createPost = createAsyncThunk<Post, Omit<Post, 'id' | 'comments' | 'postedAt'>>('posts/createPost', postsApi.createPost);
export const updatePost = createAsyncThunk<Post, Post>('posts/updatePost', postsApi.updatePost);
export const deletePost = createAsyncThunk<string, string>('posts/deletePost', async (id) => {
  await postsApi.deletePost(id);
  return id;
});
export const addComment = createAsyncThunk<AddCommentResponse, { postId: string; comment: Omit<Comment, 'id'> }>(
  'posts/addComment',
  async ({ postId, comment }) => {
    return postsApi.addComment(postId, comment);
  }
);

// Slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1; 
    },
    setAuthor(state, action: PayloadAction<string>) {
      state.author = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetchPosts
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<GetPostsResponse>) => {
        state.data = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      });

    // fetchPostById
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<Post>) => {
        state.currentPost = action.payload;
        const idx = state.data.findIndex((p) => p.id === action.payload.id);
        if (idx >= 0) state.data[idx] = action.payload;
        else state.data.push(action.payload);
        state.loading = false;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch post';
      });

    // createPost
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.data.push(action.payload);
        state.loading = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create post';
      });

    // updatePost
    builder
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const idx = state.data.findIndex((p) => p.id === action.payload.id);
        if (idx >= 0) state.data[idx] = action.payload;
        if (state.currentPost?.id === action.payload.id) state.currentPost = action.payload;
        state.loading = false;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update post';
      });

    // deletePost
    builder
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.data = state.data.filter((p) => p.id !== action.payload);
        if (state.currentPost?.id === action.payload) state.currentPost = null;
        state.loading = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete post';
      });

    // addComment
    builder
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<AddCommentResponse>) => {
        const updatedPost = action.payload;
        if (state.currentPost?.id === updatedPost.id) state.currentPost = updatedPost;
        const idx = state.data.findIndex(p => p.id === updatedPost.id);
        if (idx >= 0) state.data[idx] = updatedPost;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add comment';
      });
  },
});

export const { setSearch, setAuthor, setPage } = postsSlice.actions;
export default postsSlice.reducer;
