import {
  User,
  Repository,
  APIUserResponse,
  APIRepositoryResponse,
} from '../types';

// Function to fetch user information from GitHub API
export const fetchUser = async (username: string): Promise<APIUserResponse> => {
  try {
    // Fetch user information from GitHub API
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      return {
        message:
          response.status === 404 ? 'User not found' : response.statusText,
      };
    }
    const data = await response.json();

    // Map the data to the User type
    const user: User = {
      id: data.id,
      login: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      url: data.url,
      public_repos: data.public_repos,
      number_of_repo_pages: data.public_repos
        ? Math.ceil(data.public_repos / 10)
        : 1,
    };

    // Return the mapped user
    return user;
  } catch (error) {
    // Return a general error message
    return {
      message: 'Something went wrong',
    };
  }
};

// Function to fetch repository information from GitHub API
export const fetchRepos = async (
  username: string,
  page: number
): Promise<APIRepositoryResponse> => {
  try {
    // Fetch repository information from GitHub API
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=10`
    );
    if (!response.ok) {
      return {
        message: response.statusText,
      };
    }
    const data = await response.json();

    // Map the data to the Repository type
    const repos: Repository[] = data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
    }));

    // Return the mapped repositories
    return repos;
  } catch (error) {
    // Return a general error message
    return {
      message: 'Something went wrong',
    };
  }
};
