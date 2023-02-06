import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser, fetchRepos } from '../services/githubAPI';
import { User, Repo } from '../types';

export interface UserState {
  user: User | undefined;
  repos: Repo[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  user: undefined,
  repos: [],
  status: 'idle',
};

export const getUser = createAsyncThunk(
  'user/getUser',
  async (username: string) => {
    const user = await fetchUser(username);
    return user;
  }
);

export const getRepos = createAsyncThunk(
  'user/getRepos',
  async (data: { username: string; page: number }) => {
    const { username, page } = data;
    const repos = await fetchRepos(username, page);
    return repos;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(getRepos.fulfilled, (state, action: PayloadAction<Repo[]>) => {
        state.repos = action.payload;
      });
  },
});

export default userSlice.reducer;
