import { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';

const App = () => {
  const [searchValue, setSearchValue] = useState('');

  const hendleSearch = value => {
    setSearchValue(value);
  };

  return (
    <div>
      <Searchbar setSearchValue={hendleSearch} />
      <ImageGallery keyWord={searchValue} />
      <ToastContainer autoClose={3000} theme="colored" />
    </div>
  );
};

App.propTypes = {
  value: PropTypes.string,
};

export default App;
