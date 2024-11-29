import React from 'react';
import './Search.css'
const Search = ({ searchUser, setSearchUser }) => (
  <div id="search_container">
    <div id="search">
      <input
        type="text"
        placeholder="Search"
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
      />
    </div>
  </div>
);

export default Search;
