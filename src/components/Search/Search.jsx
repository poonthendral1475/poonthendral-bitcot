import React from 'react';
import './Search.css'
const Search = ({ searchTerm, setSearchTerm }) => (
  <div id="search_container">
    <div id="search">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  </div>
);

export default Search;
