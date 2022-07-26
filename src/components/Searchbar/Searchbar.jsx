import React, { useState } from 'react';
import style from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [inputName, setInputName] = useState('');

  const handleNameChange = evt => {
    const { value } = evt.currentTarget;
    setInputName(value);
  };

  const handleSubmitForm = evt => {
    evt.preventDefault();
    if (inputName.trim() === '') {
      console.log('Enter pictures name');
      return;
    }
    onSubmit(inputName);
    setInputName('');
  };

  return (
    <header className={style.searchbar}>
      <form className={style.searchForm} onSubmit={handleSubmitForm}>
        <button type="submit" className={style.searchFormButton}>
          <span className={style.searchFormButtonLabel}>Search</span>
        </button>
        <input
          className={style.searchFormInput}
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
          value={inputName}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}
