import React, { ReactElement } from 'react';
import UserInfoCard from '../components/UserInfoCard';
import RepositoriesList from '../components/RepositoriesList';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const DisplayUserPage = (): ReactElement => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('..');
  };

  return (
    <div className='display-user-page'>
      <h1>User Result</h1>
      <button
        className='back-button'
        onClick={() => goBack()}
        aria-label='back'
      >
        <IoIosArrowBack size={20} />
      </button>
      <UserInfoCard />
      <RepositoriesList />
    </div>
  );
};

export default DisplayUserPage;
