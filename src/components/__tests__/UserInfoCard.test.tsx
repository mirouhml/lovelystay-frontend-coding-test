import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RootState } from '../../app/store';
import UserInfoCard from '../UserInfoCard';

const mockStore = configureStore([thunk]);

describe('UserInfoCard', () => {
  it('should have render all user information', () => {
    render(
      <Provider
        store={mockStore({
          user: {
            user: {
              id: '1',
              login: 'johndoe',
              name: 'John Doe',
              avatar_url: 'avatar-url',
              public_repos: 0,
              number_of_repo_pages: 0,
              url: 'github-url',
            },
            repositories: [],
            status: {
              user: 'success',
              repos: 'idle',
            },
            error: undefined,
          },
        } as RootState)}
      >
        <MemoryRouter>
          <UserInfoCard />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
    expect(
      screen.getByText('Number of public repositories: 0')
    ).toBeInTheDocument();
  });

  it('should have render loading message', () => {
    render(
      <Provider
        store={mockStore({
          user: {
            user: undefined,
            repositories: [],
            status: {
              user: 'loading',
              repos: 'idle',
            },
            error: undefined,
          },
        } as RootState)}
      >
        <MemoryRouter>
          <UserInfoCard />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getByRole('generic', {
        name: /user-info-loading/i,
      })
    ).toBeInTheDocument();
  });

  it('should have render error message', () => {
    render(
      <Provider
        store={mockStore({
          user: {
            user: undefined,
            repositories: [],
            status: {
              user: 'failed',
              repos: 'idle',
            },
            error: 'Error',
          },
        } as RootState)}
      >
        <MemoryRouter>
          <UserInfoCard />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getByRole('generic', {
        name: /user-info-error/i,
      })
    ).toBeInTheDocument();
  });

  it('should show no name was found', () => {
    render(
      <Provider
        store={mockStore({
          user: {
            user: {
              id: '1',
              login: 'johndoe',
              name: '',
              avatar_url: 'avatar-url',
              public_repos: 0,
              number_of_repo_pages: 0,
              url: 'github-url',
            },
            repositories: [],
            status: {
              user: 'success',
              repos: 'idle',
            },
            error: undefined,
          },
        } as RootState)}
      >
        <MemoryRouter>
          <UserInfoCard />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('No name was found')).toBeInTheDocument();
  });
});
