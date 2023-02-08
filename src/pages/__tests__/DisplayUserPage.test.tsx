import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import DisplayUserPage from '../DisplayUserPage';
import SearchUserPage from '../SearchUserPage';
import store from '../../app/store';

describe('DisplayUserPage', () => {
  it('should render the display user page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <DisplayUserPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('User Result')).toBeInTheDocument();
  });

  it('Should have a back button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <DisplayUserPage />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getByRole('button', {
        name: /back/i,
      })
    ).toBeInTheDocument();
  });

  it('Should lead to the search page when the back button is clicked', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/mirouhml']}>
          <Routes>
            <Route path='/' element={<SearchUserPage />} />
            <Route path='/:username' element={<DisplayUserPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(
      screen.getByRole('button', {
        name: /back/i,
      })
    );
    expect(
      await screen.findByText('Search for a GitHub user')
    ).toBeInTheDocument();
  });

  it('Should have a user info card', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/mirouhml']}>
          <DisplayUserPage />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getByRole('generic', {
        name: /user-info/i,
      })
    ).toBeInTheDocument();
  });

  it('Should have a repositories list', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/mirouhml']}>
          <DisplayUserPage />
        </MemoryRouter>
      </Provider>
    );
    expect(
      await screen.findByRole('generic', {
        name: /repositories-list/i,
      })
    ).toBeInTheDocument();
  });
});
