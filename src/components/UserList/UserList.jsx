import React from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import './UserList.css'
const UserList = ({ users, onEditClick, onDeleteClick, onViewClick }) => (
  <ul>
    {users.map((user) => (
      <li key={user.id}>
        <div id="id_data">
          <h3>{user.id}</h3>
          <div id="user_data">
            <div id="profile">
              <AccountCircleOutlinedIcon fontSize="large" />
            </div>
            <div id='name_num'>
              <p id="name"><strong>{user.name}</strong></p>
              <p id="mobile"><strong>{user.mobile}</strong></p>
            </div>
          </div>
        </div>
        <div id="actions">
          <VisibilityRoundedIcon onClick={() => onViewClick(user)} />
          <DeleteRoundedIcon onClick={() => onDeleteClick(user.id)} />
          <ModeEditRoundedIcon onClick={() => onEditClick(user)} />
        </div>
      </li>
    ))}
  </ul>
);

export default UserList;