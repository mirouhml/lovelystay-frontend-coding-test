import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchUserPage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/${username}`);
  };

  return (
    <div className='search-user-page'>
      <h1>Search for a GitHub user</h1>
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
