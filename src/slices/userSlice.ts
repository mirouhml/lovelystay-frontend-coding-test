import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser, fetchRepos } from '../services/githubAPI';
import {
  User,
  Repository,
  APIUserResponse,
  APIRepositoryResponse,
  APIError,
} from '../types';

export interface UserState {
  user: User | undefined;
  repositories: Repository[];
  status: {
    user: 'idle' | 'success' | 'loading' | 'failed';
    repos: 'idle' | 'success' | 'loading' | 'failed';
  };
  error: string | undefined;
}

const initialState: UserState = {
  user: undefined,
  repositories: [],
  status: {
    user: 'idle',
    repos: 'idle',
  },
  error: undefined,
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
  async (data: { username: string; page: string }) => {
    const { username, page } = data;
    const repos = await fetchRepos(username, page);
    return repos;
  }
);

function isAPIError(
  toBeDetermined: APIUserResponse | APIRepositoryResponse
): toBeDetermined is APIError {
  return (toBeDetermined as APIError).message !== undefined;
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status.user = 'loading';
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<APIUserResponse>) => {
          if (isAPIError(action.payload)) {
            state.status.user = 'failed';
            state.error = action.payload.message;
            console.log('here');
            return;
          }
          console.log('here');
          state.status.user = 'success';
          state.user = action.payload;
        }
      )
      .addCase(getUser.rejected, (state, action) => {
        state.status.user = 'failed';
        state.error = action.error.message;
      })
      .addCase(getRepos.pending, (state) => {
        state.status.repos = 'loading';
      })
      .addCase(
        getRepos.fulfilled,
        (state, action: PayloadAction<APIRepositoryResponse>) => {
          if (isAPIError(action.payload)) {
            state.status.repos = 'failed';
            state.error = action.payload.message;
            return;
          }
          state.status.repos = 'success';
          state.repositories = action.payload;
        }
      )
      .addCase(getRepos.rejected, (state, action) => {
        state.status.repos = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
