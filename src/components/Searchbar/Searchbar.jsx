import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';
import {
  SearchbarWrap,
  SearchForm,
  SearchInput,
  SearchButton,
} from './Searchbar.styled';

const Searchbar = ({ setSearchValue }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const hendleSubmit = e => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      toast.info('Enter a keyword to search for a picture.');
      return;
    }

    setSearchValue(inputValue.toLowerCase());
    setInputValue('');
  };

  return (
    <SearchbarWrap>
      <SearchForm onSubmit={hendleSubmit}>
        <SearchButton type="submit">
          <BsSearch size={20} fill="black" />
        </SearchButton>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarWrap>
  );
};

Searchbar.propTypes = {
  setSearchValue: PropTypes.func,
};

export default Searchbar;
