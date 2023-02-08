import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/store';

describe('App', () => {
  it('should render home page correctly', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText('Search for a GitHub user')).toBeInTheDocument();
  });
});
