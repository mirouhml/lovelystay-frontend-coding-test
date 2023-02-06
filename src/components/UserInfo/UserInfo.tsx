import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { getUser } from '../../slices/userSlice';

const UserInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: any) => state.user);
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    if (username) dispatch(getUser(username));
  }, [dispatch, username]);

  if (user)
    return (
      <div>
        <h1>UserInfo</h1>
        <img src={user.avatar_url} alt='User profile' />
        <p>Name: {user.name}</p>
        <p>Number of public repositories: {user.public_repos}</p>
      </div>
    );
  return <div>Loading...</div>;
};

export default UserInfo;
