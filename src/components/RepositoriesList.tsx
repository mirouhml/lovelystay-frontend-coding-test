import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { useSearchParams } from 'react-router-dom';
import { getRepos } from '../slices/userSlice';
import { Repository } from '../types';
import RepositoryItem from './RepositoryItem';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const RepositoriesList = (): ReactElement => {
  const { user, repositories, status, error } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState('1');
  const [numberOfPages, setNumberOfPages] = useState('1');

  // Fetch repository information if the user is defined and the user status is success
  useEffect(() => {
    if (user && page && status.user === 'success') {
      dispatch(getRepos({ username: user?.login, page }));
    }
  }, [dispatch, page, user, status.user]);

  // Set the number of pages for the repository if the user is defined and the user status is success
  useEffect(() => {
    if (user !== undefined && status.user === 'success') {
      setNumberOfPages(user.number_of_repo_pages.toString());
    }
  }, [user, status.user]);

  // Handle page change when the user clicks on the previous or next button
  const handlePageChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let newPage;
    const target = e.target as HTMLButtonElement;
    if (target.innerHTML.includes('Previous')) {
      newPage = parseInt(page) - 1;
    } else {
      newPage = parseInt(page) + 1;
    }
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
    setPage(newPage.toString());
  };

  // Render different components based on the status of the user and repository
  if (status.user === 'success' && status.repos === 'success')
    return (
      <div className='repositories-container' aria-label='repositories-list'>
        <h2 className='repositories-title'>{user?.login}'s Repositories</h2>
        <ul>
          {repositories.map((repo: Repository) => (
            <RepositoryItem
              key={repo.id}
              name={repo.name}
              description={repo.description}
            />
          ))}
        </ul>
        <div className='repositories-buttons'>
          <button onClick={(e) => handlePageChange(e)} disabled={page === '1'}>
            <IoIosArrowBack /> Previous
          </button>
          <button
            onClick={(e) => handlePageChange(e)}
            disabled={page === numberOfPages}
          >
            Next <IoIosArrowForward />
          </button>
        </div>
      </div>
    );
  else if (status.user === 'success' && status.repos === 'loading')
    return (
      <div className='repositories-container' aria-label='repositories-list'>
        <h2 className='repositories-title'>{user?.login}'s Repositories</h2>
        <p className='status-message'>Loading...</p>
      </div>
    );
  else if (status.user === 'success' && status.repos === 'failed')
    return (
      <div className='repositories-container' aria-label='repositories-list'>
        <h2 className='repositories-title'>{user?.login}'s Repositories</h2>
        <p className='status-message'>{error}</p>
      </div>
    );
  else return <></>;
};

export default RepositoriesList;