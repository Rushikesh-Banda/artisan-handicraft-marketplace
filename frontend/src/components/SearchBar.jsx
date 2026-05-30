import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?keyword=${keyword}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <form onSubmit={submitHandler} style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '500px' }}>
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search for unique crafts..."
        style={{
          flex: 1,
          padding: '0.75rem 1.5rem',
          borderRadius: '9999px',
          background: 'var(--surface-color)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-primary)',
          outline: 'none'
        }}
      />
      <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
