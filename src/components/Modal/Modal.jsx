import { createPortal } from 'react-dom';
import React, { useEffect } from 'react';
import style from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ largeImageURL, onClose }) {
  useEffect(() => {
    const handleKeyDown = evt => {
      const { code } = evt;
      if (code === 'Escape') {
        console.log('Done');
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClickBackdrop = evt => {
    const { currentTarget, target } = evt;
    if (currentTarget === target) {
      onClose();
    }
  };

  return createPortal(
    <div className={style.overlay} onClick={handleClickBackdrop}>
      <div className={style.modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>,
    modalRoot
  );
}
