import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ModalOverlay, ModalContent } from './Modal.styled';

const Modal = ({ imgURL, alt, onClose }) => {
  useEffect(() => {
    const hendleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', hendleKeyDown);

    return () => {
      window.removeEventListener('keydown', hendleKeyDown);
    };
  }, [onClose]);

  const hendleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={hendleBackdropClick}>
      <ModalContent>
        <img src={imgURL} alt={alt} />
      </ModalContent>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  imgURL: PropTypes.string,
  alt: PropTypes.string,
};

export default Modal;
