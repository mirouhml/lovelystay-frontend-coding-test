import React, { ReactElement, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { useParams, useSearchParams } from 'react-router-dom';
import { getRepos } from '../slices/userSlice';
import { Repository } from '../types';
import RepositoryItem from './RepositoryItem';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const RepositoriesList = (): ReactElement => {
  const { user, repositories } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const { username } = useParams<{ username: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState('1');
  const [numberOfPages, setNumberOfPages] = useState('1');
  const title = useRef<HTMLHeadingElement>(null);
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
    if (target.innerHTML.includes('Previous')) {
      newPage = parseInt(page) - 1;
    } else {
      newPage = parseInt(page) + 1;
    }
    console.log(newPage);
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
    setPage(newPage.toString());
    if (title.current) title.current.scrollIntoView();
  };

  return (
    <div className='repositories-container'>
      <h1 className='repositories-title' ref={title}>
        {username}'s Repositories
      </h1>
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
};

export default RepositoriesList;