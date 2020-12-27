import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import s from './SearchBar.module.css';

const Searchbar = () => {
  const history = useHistory();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    history.push({
      ...location,
      search: `query=${searchQuery}`,
    });
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <input
        className={s.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        value={searchQuery}
        onChange={handleQueryChange}
      />

      <button type="submit" className={s.button}>
        Search
      </button>
    </form>
  );
};

export default Searchbar;
