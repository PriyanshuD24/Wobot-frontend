import React from 'react';
import './Search.css'; // Import the custom CSS file

const Search = () => {
  return (
    <div className="search-container">
      <div>
        <h1 className="search-title">Cameras</h1>
        <p className="search-subtitle">Manage your cameras here.</p>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search (Not Working Yet)"
          className="search-input"
        />
        <button type="submit" className="search-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="search-icon"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.414l3.817 3.818a1 1 0 11-1.414 1.414l-3.818-3.817zM8 14a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Search;
