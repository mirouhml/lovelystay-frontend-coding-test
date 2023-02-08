import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchUserPage = (): ReactElement => {
  // state to store the inputted username
  const [username, setUsername] = useState('');
  // hook to navigate to a different page
  const navigate = useNavigate();
  // event handler for input change, updates the username state
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  // event handler for form submission, navigates to a different page with the inputted username as part of the URL
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/${username}`);
  };

  return (
    <div className='search-user-page'>
      {/* Page header */}
      <h1>Search for a GitHub user</h1>
      {/* Form with input field and submit button */}
      <form onSubmit={onSubmit} className='form-container'>
        <input
          className='search-input'
          placeholder='Username'
          onChange={onChange}
          required
        />
        <button>Search</button>
      </form>
    </div>
  );
};

export default SearchUserPage;
