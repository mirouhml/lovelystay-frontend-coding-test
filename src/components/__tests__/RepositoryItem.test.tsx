import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RepositoryItem from '../RepositoryItem';

describe('RepositoryItem', () => {
  it('should render the repository item', () => {
    render(<RepositoryItem name='test' description='test description' />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('test description')).toBeInTheDocument();
  });

  it('should render the repository item with no description', () => {
    render(<RepositoryItem name='test' description='' />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('No description provided')).toBeInTheDocument();
  });
});
