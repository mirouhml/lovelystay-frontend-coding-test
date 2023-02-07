export type User = {
  id: string;
  login: string;
  name: string;
  avatar_url: string;
  url: string;
  public_repos: number;
  number_of_repo_pages: number;
};

export type Repository = {
  id: string;
  name: string;
  description: string;
};

export type APIError = {
  message: string;
};

export type APIUserResponse = User | APIError;

export type APIRepositoryResponse = Repository[] | APIError;
