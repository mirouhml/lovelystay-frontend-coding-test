import React, { ReactElement, useEffect } from 'react';
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

  useEffect(() => {
    const page = searchParams.get('page');
    if (username && page) dispatch(getRepos({ username, page }));
    else if (username) dispatch(getRepos({ username, page: '1' }));
  }, [dispatch, searchParams, username]);

  const handlePageChange = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    searchParams.set('page', e.currentTarget.text);
    setSearchParams(searchParams);
  };

  let pagesArray = [];
  if (user)
    for (
      var pageNumber = 1;
      pageNumber <= user.number_of_repo_pages;
      pageNumber++
    ) {
      pagesArray.push(
        <li key={pageNumber}>
          {
            <Link
              to={`/${username}?page=${pageNumber}`}
              onClick={handlePageChange}
            >
              {pageNumber}
            </Link>
          }
        </li>
      );
    }

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
      <ul>{pagesArray}</ul>
    </div>
  );
};

export default RepositoriesList;
