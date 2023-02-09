import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/store';

describe('App', () => {
  it('should match the snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/test/not-a-real-page']}>
            <App />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have a search page as the home page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Search for a GitHub user')).toBeInTheDocument();
  });

  it('should have a 404 page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/test/not-a-real-page']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });
});
