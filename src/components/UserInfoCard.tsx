import React, { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { getUser } from '../slices/userSlice';

const UserInfoCard = (): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, status, error } = useSelector((state: RootState) => state.user);
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    if (username) dispatch(getUser(username));
  }, [dispatch, username]);

  if (status.user === 'success')
    return (
      <div className='user-info-card' aria-label='user-info'>
        <img className='user-avatar' src={user?.avatar_url} alt='User avatar' />
        <div className='user-info'>
          <p className='user-name'>
            {user?.name ? user.name : 'No name was found'}
          </p>
          <p className='user-repositories'>
            Number of public repositories: {user?.public_repos}
          </p>
        </div>
      </div>
    );
  else if (status.user === 'loading')
    return (
      <div className='user-info-card' aria-label='user-info-loading'>
        <p className='status-message'>Loading...</p>
      </div>
    );
  else if (status.user === 'failed')
    return (
      <div className='user-info-card' aria-label='user-info-error'>
        <p className='status-message'>{error}</p>
      </div>
    );
  else
    return (
      <div className='user-info-card' aria-label='user-info-error'>
        <p className='status-message'>
          Something went wrong please try again later!
        </p>
      </div>
    );
};

export default UserInfoCard;
