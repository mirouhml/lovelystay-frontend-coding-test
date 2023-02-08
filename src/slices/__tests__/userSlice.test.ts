import userSliceReducer, { UserState, getUser, getRepos } from '../userSlice';

const initialState: UserState = {
  user: undefined,
  repositories: [],
  status: {
    user: 'idle',
    repos: 'idle',
  },
  error: undefined,
};

describe('userSlice', () => {
  it('should return the initial state', () => {
    expect(userSliceReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle getUser/pending', () => {
    expect(userSliceReducer(initialState, getUser.pending)).toEqual({
      ...initialState,
      status: {
        user: 'loading',
        repos: 'idle',
      },
    });
  });

  it('should handle getUser/fulfilled with correct user', () => {
    expect(
      userSliceReducer(initialState, {
        type: getUser.fulfilled.type,
        payload: {
          id: '1',
          login: 'johndoe',
          name: 'John Doe',
          avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
          url: 'https://api.github.com/users/johndoe',
          public_repos: 2,
          number_of_repo_pages: 1,
        },
      })
    ).toEqual({
      ...initialState,
      status: {
        user: 'success',
        repos: 'idle',
      },
      user: {
        id: '1',
        login: 'johndoe',
        name: 'John Doe',
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        url: 'https://api.github.com/users/johndoe',
        public_repos: 2,
        number_of_repo_pages: 1,
      },
    });
  });

  it('should handle getUser/fulfilled with error', () => {
    expect(
      userSliceReducer(initialState, {
        type: getUser.fulfilled.type,
        payload: {
          message: 'User not found',
        },
      })
    ).toEqual({
      ...initialState,
      status: {
        user: 'failed',
        repos: 'idle',
      },
      error: 'User not found',
    });
  });

  it('should handle getUser/rejected', () => {
    expect(
      userSliceReducer(initialState, {
        type: getUser.rejected.type,
        error: {
          message: 'Something went wrong',
        },
      })
    ).toEqual({
      ...initialState,
      status: {
        user: 'failed',
        repos: 'idle',
      },
      error: 'Something went wrong',
    });
  });

  it('should handle getRepos/pending', () => {
    expect(userSliceReducer(initialState, getRepos.pending)).toEqual({
      ...initialState,
      status: {
        user: 'idle',
        repos: 'loading',
      },
    });
  });

  it('should handle getRepos/fulfilled with correct repos', () => {
    expect(
      userSliceReducer(initialState, {
        type: getRepos.fulfilled.type,
        payload: [
          {
            id: 1,
            name: 'repo1',
            description: 'description1',
          },
          {
            id: 2,
            name: 'repo2',
            description: 'description2',
          },
        ],
      })
    ).toEqual({
      ...initialState,
      status: {
        user: 'idle',
        repos: 'success',
      },
      repositories: [
        {
          id: 1,
          name: 'repo1',
          description: 'description1',
        },
        {
          id: 2,
          name: 'repo2',
          description: 'description2',
        },
      ],
    });
  });

  it('should handle getRepos/fulfilled with error', () => {
    expect(
      userSliceReducer(initialState, {
        type: getRepos.fulfilled.type,
        payload: {
          message: "Couldn't find any repositories",
        },
      })
    ).toEqual({
      ...initialState,
      status: {
        user: 'idle',
        repos: 'failed',
      },
      error: "Couldn't find any repositories",
    });
  });

  it('should handle getRepos/rejected', () => {
    expect(
      userSliceReducer(initialState, {
        type: getRepos.rejected.type,
        error: {
          message: 'Something went wrong',
        },
      })
    ).toEqual({
      ...initialState,
      status: {
        user: 'idle',
        repos: 'failed',
      },
      error: 'Something went wrong',
    });
  });

  it('should call getUser thunk', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    await getUser('johndoe')(dispatch, getState, null);

    expect(dispatch).toHaveBeenCalledWith({
      type: getUser.pending.type,
      payload: undefined,
      meta: {
        arg: 'johndoe',
        requestId: expect.any(String),
        requestStatus: 'pending',
      },
    });
  });

  it('should call getRepos thunk', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    await getRepos({ username: 'johndoe', page: '1' })(
      dispatch,
      getState,
      null
    );

    expect(dispatch).toHaveBeenCalledWith({
      type: getRepos.pending.type,
      payload: undefined,
      meta: {
        arg: {
          username: 'johndoe',
          page: '1',
        },
        requestId: expect.any(String),
        requestStatus: 'pending',
      },
    });
  });
});
