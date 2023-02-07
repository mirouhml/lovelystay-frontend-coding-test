import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import { fetchUser, fetchRepos } from '../githubAPI';
enableFetchMocks();

describe('fetchUser', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should return a user object', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        id: 1,
        login: 'johndoe',
        name: 'John Doe',
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        url: 'https://api.github.com/users/johndoe',
        public_repos: 2,
      }),
      { status: 200 }
    );
    const user = await fetchUser('johndoe');
    expect(user).toEqual({
      id: 1,
      login: 'johndoe',
      name: 'John Doe',
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
      url: 'https://api.github.com/users/johndoe',
      public_repos: 2,
      number_of_repo_pages: 1,
    });
  });

  it('should return an error message if the user is not found', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        message: 'Not Found',
      }),
      { status: 404 }
    );

    const user = await fetchUser('not-a-user');
    expect(user).toEqual({
      message: 'User not found',
    });
  });

  it('should return an error message if something goes wrong', async () => {
    fetch.mockRejectOnce(() => Promise.reject('API is down'));
    const user = await fetchUser('error');
    expect(user).toEqual({
      message: 'Something went wrong',
    });
  });
});

describe('fetchRepos', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should return an array of repositories', async () => {
    fetch.mockResponseOnce(
      JSON.stringify([
        {
          id: 1,
          name: 'repo1',
          description: 'This is repo1',
        },
        {
          id: 2,
          name: 'repo2',
          description: 'This is repo2',
        },
      ]),
      { status: 200 }
    );
    const repos = await fetchRepos('johndoe', '1');
    expect(repos).toEqual([
      {
        id: 1,
        name: 'repo1',
        description: 'This is repo1',
      },
      {
        id: 2,
        name: 'repo2',
        description: 'This is repo2',
      },
    ]);
  });

  it('should return an error message if something goes wrong', async () => {
    fetch.mockRejectOnce(() => Promise.reject('API is down'));
    const repos = await fetchRepos('error', '1');
    expect(repos).toEqual({
      message: 'Something went wrong',
    });
  });
});
