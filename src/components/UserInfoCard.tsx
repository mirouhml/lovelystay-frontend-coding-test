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

  // Determine the status message based on the value of status.user
  let statusMessage;
  // If the user status is "loading", set the status message to "Loading..."
  if (status.user === 'loading') {
    statusMessage = 'Loading...';
    // If the user status is "failed", set the status message to the error
  } else if (status.user === 'failed') {
    statusMessage = error;
    // Otherwise, set the status message to the user's name or "No name was found"
  } else {
    statusMessage = user?.name ? user.name : 'No name was found';
  }

  return (
    <div className='user-info-card' aria-label='user-info'>
      {status.user === 'success' && (
        <>
          <img
            className='user-avatar'
            src={user?.avatar_url}
            alt='User avatar'
          />
          <div className='user-info'>
            <h1 className='user-name'>{statusMessage}</h1>
            <p className='user-repositories'>
              Number of public repositories: {user?.public_repos}
            </p>
          </div>
        </>
      )}
      {status.user !== 'success' && (
        <p className='status-message'>
          {status.user === 'loading'
            ? 'Loading...'
            : status.user === 'failed'
            ? error
            : 'Something went wrong please try again later!'}
        </p>
      )}
    </div>
  );
};

export default UserInfoCard;
