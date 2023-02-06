import React from 'react';
import UserInfoCard from '../../components/UserInfoCard';
import RepositoriesList from '../../components/RepositoriesList';

const DisplayUserPage = () => {
  return (
    <div className='display-user-page'>
      <UserInfoCard />
      <RepositoriesList />
    </div>
  );
};

export default DisplayUserPage;
