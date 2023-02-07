import React from 'react';
import UserInfoCard from '../../components/UserInfoCard';
import RepositoriesList from '../../components/RepositoriesList';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const DisplayUserPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('..');
  };

  return (
    <div className='display-user-page'>
      <button className='back-button' onClick={() => goBack()}>
        <IoIosArrowBack size={20} />
      </button>
      <UserInfoCard />
      <RepositoriesList />
    </div>
  );
};

export default DisplayUserPage;
