import React, { ReactElement } from 'react';
import UserInfoCard from '../components/UserInfoCard';
import RepositoriesList from '../components/RepositoriesList';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

//DisplayUserPage component that display the user information and repository list
const DisplayUserPage = (): ReactElement => {
  //useNavigate hook to handle navigation in the application
  const navigate = useNavigate();

  //handler to navigate back to the previous page
  const goBack = () => {
    navigate('..');
  };

  return (
    <div className='display-user-page'>
      <h1>User Result</h1>
      {/* Back button to navigate to the previous page */}
      <button
        className='back-button'
        onClick={() => goBack()}
        aria-label='back'
      >
        <IoIosArrowBack size={20} />
      </button>
      {/* Component that displays the user information */}
      <UserInfoCard />
      {/* Component that displays the repository list */}
      <RepositoriesList />
    </div>
  );
};

export default DisplayUserPage;
