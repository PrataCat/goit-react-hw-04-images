import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { GalleryUl } from './ImageGallery.styled';
import FetchQuery from '../../services/Api';
import { IMG_PER_PAGE } from '../../services/Api/Api';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Loader from '../Loader';

const ImageGallery = ({ keyWord }) => {
  const [imageArr, setImageArr] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [errorMassege, setErrorMassege] = useState(null);
  const [prevKeyWord, setPrevKeyWord] = useState('');

  const pageUpdate = () => {
    setPage(prevState => prevState + 1);
    setPrevKeyWord(keyWord);
  };

  useEffect(() => {
    if (!keyWord) {
      return;
    }

    setIsLoading(true);
    setDisabledBtn(false);

    const getImages = async () => {
      try {
        const data = await FetchQuery(keyWord, page);

        if (data.length === 0) {
          toast.info('There are no images for your request.');
          setImageArr([]);
          setIsLoading(false);
          return;
        }

        if (data.length === IMG_PER_PAGE) {
          setDisabledBtn(true);
        } else {
          setDisabledBtn(false);
        }

        setImageArr(state => [...state, ...data]);
      } catch (error) {
        setImageArr([]);
        setPage(1);
        setPrevKeyWord('');
        setDisabledBtn(false);
        setErrorMassege(
          'Ooops, something went wrong. Restart the application.'
        );
      }

      setIsLoading(false);
    };

    if (prevKeyWord !== keyWord && page === 1) {
      setImageArr([]);
      getImages();
      setPrevKeyWord(keyWord);
      return;
    }

    if (prevKeyWord !== keyWord && page !== 1) {
      setPage(1);
      return;
    }

    if (prevKeyWord === keyWord && page !== 1) {
      getImages();
    }
  }, [keyWord, page, prevKeyWord]);

  return (
    <>
      <GalleryUl>
        {imageArr.map(image => (
          <ImageGalleryItem key={image.id} image={image} />
        ))}
      </GalleryUl>
      {errorMassege && <h2>{errorMassege}</h2>}
      {isLoading && <Loader />}
      {disabledBtn && <Button onClickBtn={pageUpdate} />}
    </>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.array,
  keyWord: PropTypes.string.isRequired,
};

export default ImageGallery;
