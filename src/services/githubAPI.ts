import {
  User,
  Repository,
  APIUserResponse,
  APIRepositoryResponse,
} from '../types';

export const fetchUser = async (username: string): Promise<APIUserResponse> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    if (response.status === 200) {
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
    } else if (response.status === 404) {
      return {
        message: 'User not found',
      };
    }
    return {
      message: data.message,
    };
  } catch (error) {
    return {
      message: 'Something went wrong',
    };
  }
};

export const fetchRepos = async (
  username: string,
  page: string
): Promise<APIRepositoryResponse> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=10`
    );
    const data = await response.json();
    if (response.status === 200) {
      const repos: Repository[] = data.map((repo: any) => {
        return {
          id: repo.id,
          name: repo.name,
          description: repo.description,
        };
      });
      return repos;
    }
    return {
      message: data.message,
    };
  } catch (error) {
    return {
      message: 'Something went wrong',
    };
  }
};
