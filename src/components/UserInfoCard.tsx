import React, { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { getUser } from '../slices/userSlice';

const UserInfoCard = (): ReactElement => {
  // Dispatch hook for accessing dispatch function from the Redux store
  const dispatch = useDispatch<AppDispatch>();

  // Selector hook to get user and status data from the Redux store
  const { user, status, error } = useSelector((state: RootState) => state.user);

  // Hook to access the username from the URL parameters
  const { username } = useParams<{ username: string }>();

  // useEffect hook to dispatch the getUser action with the username as parameter
  // when the component is mounted and the username is available
  useEffect(() => {
    if (username) dispatch(getUser(username));
  }, [dispatch, username]);

  // Check the status of the user data and return the appropriate UI
  if (status.user === 'success') {
    return (
      <div className='user-info-card' aria-label='user-info'>
        <img className='user-avatar' src={user?.avatar_url} alt='User avatar' />
        <div className='user-info'>
          <h1 className='user-name'>
            {user?.name ? user.name : 'No name was found'}
          </h1>
          <p className='user-repositories'>
            Number of public repositories: {user?.public_repos}
          </p>
        </div>
      </div>
    );
  } else if (status.user === 'loading') {
    return (
      <div className='user-info-card' aria-label='user-info-loading'>
        <p className='status-message'>Loading...</p>
      </div>
    );
  } else if (status.user === 'failed') {
    return (
      <div className='user-info-card' aria-label='user-info-error'>
        <p className='status-message'>{error}</p>
      </div>
    );
  } else {
    return (
      <div className='user-info-card' aria-label='user-info-error'>
        <p className='status-message'>
          Something went wrong please try again later!
        </p>
      </div>
    );
  }
};

export default UserInfoCard;
