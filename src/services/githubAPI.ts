import { User, Repository } from '../types';

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
      number_of_repo_pages: Math.ceil(data.public_repos / 10),
    };
    return user;
  } catch (error) {
    return {} as User;
  }
};

export const fetchRepos = async (
  username: string,
  page: string
): Promise<Repository[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=10`
    );
    const data = await response.json();
    const repos: Repository[] = data.map((repo: any) => {
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
