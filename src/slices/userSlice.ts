import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser, fetchRepos } from '../services/githubAPI';
import {
  User,
  Repository,
  APIUserResponse,
  APIRepositoryResponse,
  APIError,
} from '../types';

// State interface to represent the data and status of the user data
export interface UserState {
  // The user data, initially undefined
  user: User | undefined;
  // An array of repositories, initially empty
  repositories: Repository[];
  // Object to store the status of the user and repository data
  status: {
    user: 'idle' | 'success' | 'loading' | 'failed';
    repos: 'idle' | 'success' | 'loading' | 'failed';
  };
  // Error message, initially undefined
  error: string | undefined;
}

// Initial state of the user data
const initialState: UserState = {
  user: undefined,
  repositories: [],
  status: {
    user: 'idle',
    repos: 'idle',
  },
  error: undefined,
};

// Action to get the user data
export const getUser = createAsyncThunk(
  'user/getUser',
  // Async function to fetch the user data
  async (username: string) => {
    const user = await fetchUser(username);
    return user;
  }
);

// Action to get the repository data
export const getRepos = createAsyncThunk(
  'user/getRepos',
  // Async function to fetch the repository data
  async (data: { username: string; page: number }) => {
    const { username, page } = data;
    const repos = await fetchRepos(username, page);
    return repos;
  }
);

// Function to determine if the response from the API is an error
const isAPIError = (
  toBeDetermined: APIUserResponse | APIRepositoryResponse
): toBeDetermined is APIError => {
  return (toBeDetermined as APIError).message !== undefined;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the 'pending' state of the 'getUser' action
    builder
      .addCase(getUser.pending, (state) => {
        state.status.user = 'loading';
      })
      // Handle the 'fulfilled' state of the 'getUser' action
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<APIUserResponse>) => {
          // Check if the API response is an error
          if (isAPIError(action.payload)) {
            state.status.user = 'failed';
            state.error = action.payload.message;
            // Exit the function if the API response is an error
            return;
          }
          state.status.user = 'success';
          state.user = action.payload;
        }
      )
      // Handle the 'rejected' state of the 'getUser' action
      .addCase(getUser.rejected, (state, action) => {
        state.status.user = 'failed';
        state.error = action.error.message;
      })
      // Handle the 'pending' state of the 'getRepos' action
      .addCase(getRepos.pending, (state) => {
        state.status.repos = 'loading';
      })
      // Handle the 'fulfilled' state of the 'getRepos' action
      .addCase(
        getRepos.fulfilled,
        (state, action: PayloadAction<APIRepositoryResponse>) => {
          // Check if the API response is an error
          if (isAPIError(action.payload)) {
            state.status.repos = 'failed';
            state.error = action.payload.message;
            // Exit the function if the API response is an error
            return;
          }
          state.status.repos = 'success';
          state.repositories = action.payload;
        }
      )
      // Handle the 'rejected' state of the 'getRepos' action
      .addCase(getRepos.rejected, (state, action) => {
        state.status.repos = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
