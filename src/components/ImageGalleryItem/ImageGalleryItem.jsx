import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from '../Modal';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const { id, webformatURL, largeImageURL, tags } = image;

  const toggleModal = () => {
    setShowModal(prevState => (prevState = !prevState));
  };

  return (
    <GalleryItem key={id}>
      <GalleryImage src={webformatURL} alt={tags} onClick={toggleModal} />
      {showModal && (
        <Modal imgURL={largeImageURL} alt={tags} onClose={toggleModal} />
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
  id: PropTypes.string,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};

export default ImageGalleryItem;
