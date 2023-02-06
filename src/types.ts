export type User = {
  id: string;
  login: string;
  name: string;
  avatar_url: string;
  url: string;
  public_repos: number;
};

export type Repo = {
  id: string;
  name: string;
  description: string;
};
