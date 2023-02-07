import { fetchUser, fetchRepos } from '../githubAPI';

describe('fetchUser', () => {
  it('should return a user object', async () => {
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
    const user = await fetchUser('not-a-user');
    expect(user).toEqual({
      message: 'User not found',
    });
  });

  it('should return an error message if something goes wrong', async () => {
    const user = await fetchUser('error');
    expect(user).toEqual({
      message: 'Something went wrong',
    });
  });
});

describe('fetchRepos', () => {
  it('should return an array of repositories', async () => {
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
    const repos = await fetchRepos('error', '1');
    expect(repos).toEqual({
      message: 'Something went wrong',
    });
  });
});
