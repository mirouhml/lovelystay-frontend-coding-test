import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../../components/SearchInput/SearchInput';

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
    <form onSubmit={onSubmit}>
      <SearchInput onChange={onChange} />
      <button>Search</button>
    </form>
  );
};

export default SearchUserPage;
