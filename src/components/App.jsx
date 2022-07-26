import React, { useState, useEffect } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import style from './App.module.css';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';

export default function App() {
  const [pictureName, setPictureName] = useState('');
  const [page, setPage] = useState(1);
  const [isPictures, setIsPictures] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [gallery, setGallery] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pictureName) {
      return;
    }
    setLoader(true);

    fetch(
      `https://pixabay.com/api/?q=${pictureName}&page=${page}&key=27859965-17b92fa88b33871dcb6f37147&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error('Sorry'));
      })
      .then(galleryPictures => {
        setGallery(gallery => [...gallery, ...galleryPictures.hits]);
        handleGetPictures(
          galleryPictures.total !==
            (page - 1) * 12 + galleryPictures.hits.length &&
            galleryPictures.total > 0
        );
      })
      .catch(error => setError(error))
      .finally(() => setLoader(false));
  }, [pictureName, page]);

  const toggleModal = largeImageURL => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
  };

  const handleSubmitForm = pictureName => {
    setPictureName(pictureName);
    setPage(1);
    setGallery([]);
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  const handleGetPictures = isPictures => {
    setIsPictures(isPictures);
  };

  return (
    <div className={style.App}>
      <Searchbar onSubmit={handleSubmitForm} />
      {error && <h1>{error.message}</h1>}
      {loader && <Loader />}
      <ImageGallery gallery={gallery} toggleModal={toggleModal} />
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={toggleModal} />
      )}
      {isPictures && pictureName && <Button loadMore={loadMore} />}
      {!isPictures && pictureName && <p>No more images</p>}
    </div>
  );
}
