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
    const data = await response.json();

    // If the response status is 200 (OK)
    if (response.status === 200) {
      // Map the data to the User type
      const user: User = {
        id: data.id,
        login: data.login,
        name: data.name,
        avatar_url: data.avatar_url,
        url: data.url,
        public_repos: data.public_repos,
        number_of_repo_pages: Math.ceil(data.public_repos / 10),
      };
      // Return the mapped user
      return user;
    }
    // If the response status is 404 (Not Found)
    else if (response.status === 404) {
      return {
        message: 'User not found',
      };
    }
    // Return the error message from API
    return {
      message: data.message,
    };
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
  page: string
): Promise<APIRepositoryResponse> => {
  try {
    // Fetch repository information from GitHub API
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=10`
    );
    const data = await response.json();

    // If the response status is 200 (OK)
    if (response.status === 200) {
      // Map the data to the Repository type
      const repos: Repository[] = data.map((repo: any) => {
        return {
          id: repo.id,
          name: repo.name,
          description: repo.description,
        };
      });
      // Return the mapped repositories
      return repos;
    }
    // Return the error message from API
    return {
      message: data.message,
    };
  } catch (error) {
    // Return a general error message
    return {
      message: 'Something went wrong',
    };
  }
};
