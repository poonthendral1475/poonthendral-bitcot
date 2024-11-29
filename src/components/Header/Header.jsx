import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './Header.css'
const Header = ({ onAddClick }) => (
  <div id="heading">
    <h2>All Contact</h2>
    <AddCircleOutlineIcon fontSize='large' onClick={onAddClick} />
  </div>
);

export default Header;
