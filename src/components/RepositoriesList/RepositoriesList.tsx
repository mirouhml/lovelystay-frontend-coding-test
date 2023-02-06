import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getRepos } from '../../slices/userSlice';
import { Repository } from '../../types';
import RepositoryItem from '../RepositoryItem/RepositoryItem';

const RepositoriesList = (): ReactElement => {
  const { user, repositories } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const { username } = useParams<{ username: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState('1');
  const [numberOfPages, setNumberOfPages] = useState('1');
  useEffect(() => {
    if (username && page) dispatch(getRepos({ username, page }));
  }, [dispatch, page, username]);

  useEffect(() => {
    if (user) setNumberOfPages(user.number_of_repo_pages.toString());
  }, [user]);

  const handlePageChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let newPage;
    const target = e.target as HTMLButtonElement;
    if (target.innerHTML === 'Previous') {
      newPage = parseInt(page) - 1;
    } else {
      newPage = parseInt(page) + 1;
    }
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
    setPage(newPage.toString());
  };

  return (
    <div>
      <h1>RepositoriesList</h1>
      {repositories.map((repo: Repository) => (
        <RepositoryItem
          key={repo.id}
          name={repo.name}
          description={repo.description}
        />
      ))}
      <div>
        <button onClick={(e) => handlePageChange(e)} disabled={page === '1'}>
          Previous
        </button>
        <button
          onClick={(e) => handlePageChange(e)}
          disabled={page === numberOfPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RepositoriesList;
