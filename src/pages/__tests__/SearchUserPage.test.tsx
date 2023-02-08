import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { RootState } from '../../app/store';
import renderer from 'react-test-renderer';
import SearchUserPage from '../SearchUserPage';
import DisplayUserPage from '../DisplayUserPage';
import store from '../../app/store';

const mockStore = configureStore([thunk]);

describe('SearchUserPage', () => {
  it('should match the snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <SearchUserPage />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have a search input', () => {
    render(
      <MemoryRouter>
        <SearchUserPage />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
  });

  it('should have a search button', () => {
    render(
      <MemoryRouter>
        <SearchUserPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('should lead to the user page when the search button is clicked', async () => {
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
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={<SearchUserPage />} />
            <Route path='/:username' element={<DisplayUserPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'johndoe' },
    });
    fireEvent.click(screen.getByText('Search'));
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
  });
});
