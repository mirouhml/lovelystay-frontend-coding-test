import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RootState } from '../../app/store';
import RepositoriesList from '../RepositoriesList';

const mockStore = configureStore([thunk]);

const mockRepositories = [
  {
    id: '1',
    name: 'repo1',
    description: 'description1',
  },
  {
    id: '2',
    name: 'repo2',
    description: 'description2',
  },
  {
    id: '3',
    name: 'repo3',
    description: 'description3',
  },
  {
    id: '4',
    name: 'repo4',
    description: 'description4',
  },
  {
    id: '5',
    name: 'repo5',
    description: 'description5',
  },
];

const mockUser = {
  id: '1',
  login: 'johndoe',
  name: 'John Doe',
  avatar_url: 'avatar-url',
  public_repos: 2,
  number_of_repo_pages: 2,
  url: 'github-url',
};

describe('RepositoriesList', () => {
  it('should have render all repositories', () => {
    render(
      <Provider
        store={mockStore({
          user: {
            user: mockUser,
            repositories: mockRepositories,
            status: {
              user: 'success',
              repos: 'success',
            },
            error: undefined,
          },
        } as RootState)}
      >
        <MemoryRouter>
          <RepositoriesList />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('repo1')).toBeInTheDocument();
    expect(screen.getByText('description1')).toBeInTheDocument();
    expect(screen.getByText('repo2')).toBeInTheDocument();
    expect(screen.getByText('description2')).toBeInTheDocument();
    expect(screen.getByText('repo3')).toBeInTheDocument();
    expect(screen.getByText('description3')).toBeInTheDocument();
    expect(screen.getByText('repo4')).toBeInTheDocument();
    expect(screen.getByText('description4')).toBeInTheDocument();
    expect(screen.getByText('repo5')).toBeInTheDocument();
    expect(screen.getByText('description5')).toBeInTheDocument();
  });

  it('should have render loading message', () => {
    render(
      <Provider
        store={mockStore({
          user: {
            user: mockUser,
            repositories: [],
            status: {
              user: 'success',
              repos: 'loading',
            },
            error: undefined,
          },
        } as RootState)}
      >
        <MemoryRouter>
          <RepositoriesList />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should have render error message', () => {
    render(
      <Provider
        store={mockStore({
          user: {
            user: mockUser,
            repositories: [],
            status: {
              user: 'success',
              repos: 'failed',
            },
            error: 'Error message',
          },
        } as RootState)}
      >
        <MemoryRouter>
          <RepositoriesList />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('should be able to go to next page', () => {
    render(
      <Provider
        store={mockStore({
          user: {
            user: mockUser,
            repositories: mockRepositories,
            status: {
              user: 'success',
              repos: 'success',
            },
            error: undefined,
          },
        } as RootState)}
      >
        <MemoryRouter>
          <RepositoriesList />
        </MemoryRouter>
      </Provider>
    );
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Next')).toBeDisabled();
    expect(screen.getByText('Previous')).toBeEnabled();
  });

  it('Should be able to go to previous page', () => {
    render(
      <Provider
        store={mockStore({
          user: {
            user: mockUser,
            repositories: mockRepositories,
            status: {
              user: 'success',
              repos: 'success',
            },
            error: undefined,
          },
        } as RootState)}
      >
        <MemoryRouter>
          <RepositoriesList />
        </MemoryRouter>
      </Provider>
    );
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Previous')).toBeEnabled();
    fireEvent.click(screen.getByText('Previous'));
    expect(screen.getByText('Next')).toBeEnabled();
    expect(screen.getByText('Previous')).toBeDisabled();
  });
});
