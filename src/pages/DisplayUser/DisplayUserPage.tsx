import React from 'react';
import UserInfo from '../../components/UserInfo/UserInfo';
import RepositoriesList from '../../components/RepositoriesList/RepositoriesList';

const DisplayUserPage = () => {
  return (
    <div>
      <UserInfo />
      <RepositoriesList />
    </div>
  );
};

export default DisplayUserPage;
