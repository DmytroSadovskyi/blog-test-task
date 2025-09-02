import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import postsApi, { type GetPostsResponse } from './postsApi';

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
  total: 0,
  page: 1,
  limit: 5,
  loading: false,
  error: null,
  search: '',
  author: '',
};


export const fetchPosts = createAsyncThunk('posts/fetchAll',
  async (query: { page?: number; limit?: number; search?: string; author?: string }) => {
    return postsApi.getPosts(query);
  });
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
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setAuthor(state, action: PayloadAction<string>) {
      state.author = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
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
        state.error = action.error.message || 'Error fetching posts';
      })
      .addCase(fetchPostById.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(fetchPostById.fulfilled, (state, action: PayloadAction<Post>) => {
  const idx = state.data.findIndex(p => p.id === action.payload.id);
  if (idx >= 0) {
    state.data[idx] = action.payload;
  } else {
    state.data.push(action.payload);
  }
  state.loading = false;
})
.addCase(fetchPostById.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message || 'Error fetching post';
})
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.data.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const idx = state.data.findIndex((p) => p.id === action.payload.id);
        if (idx >= 0) state.data[idx] = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.data = state.data.filter((p) => p.id !== action.meta.arg);
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Post>) => {
        const idx = state.data.findIndex((p) => p.id === action.payload.id);
        if (idx >= 0) state.data[idx] = action.payload;
      });
  },
});

export const { setSearch, setAuthor, setPage } = postsSlice.actions;
export default postsSlice.reducer;
