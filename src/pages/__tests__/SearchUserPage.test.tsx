import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import SearchUserPage from '../SearchUserPage';
import DisplayUserPage from '../DisplayUserPage';
import store from '../../app/store';

describe('SearchUserPage', () => {
  it('should render the search user page', () => {
    render(
      <MemoryRouter>
        <SearchUserPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Search for a GitHub user')).toBeInTheDocument();
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
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={<SearchUserPage />} />
            <Route path='/:username' element={<DisplayUserPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'mirouhml' },
    });
    fireEvent.click(screen.getByText('Search'));
    expect(await screen.findByText('User Result')).toBeInTheDocument();
  });
});
