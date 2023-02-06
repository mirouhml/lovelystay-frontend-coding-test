import React, { ReactElement } from 'react';

interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ onChange }: InputProps): ReactElement => {
  return (
    <div className='form-input'>
      <input
        className='search-input'
        placeholder='Username'
        onChange={onChange}
        required
      />
    </div>
  );
};

export default SearchInput;
