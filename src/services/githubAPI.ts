import { User, Repo } from '../types';

export const fetchUser = async (username: string): Promise<User> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    const user: User = {
      id: data.id,
      login: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      url: data.url,
      public_repos: data.public_repos,
    };
    return user;
  } catch (error) {
    return {} as User;
  }
};

export const fetchRepos = async (
  username: string,
  page: number
): Promise<Repo[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?page=${page}`
    );
    const data = await response.json();
    const repos: Repo[] = data.map((repo: any) => {
      return {
        id: repo.id,
        name: repo.name,
        description: repo.description,
      };
    });
    return repos;
  } catch (error) {
    return [];
  }
};
