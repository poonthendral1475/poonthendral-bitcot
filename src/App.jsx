import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import UserList from './components/UserList/UserList';
import UserModal from './components/UserModal/UserModal';

const App = () => {
  const [users, setUsers] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [searchUser, setSearchUser] = useState('');

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json')
      .then(response => response.json())
      .then(data => {
        const userData = data.map((user, index) => ({
          ...user,
          id: user.id || index + 1
        }));
        setUsers(userData);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const nextId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;

  const openModal = (user = null, editMode = false, addMode = false) => {
    setModalData(addMode ? { name: '', mobile: '', email: '' } : user);
    setIsEditMode(editMode);
    setIsAddMode(addMode);
  };

  const closeModal = () => {
    setModalData(null);
    setIsEditMode(false);
    setIsAddMode(false);
  };

  const handleAdd = (newUser) => {
    if (newUser.name && newUser.mobile && newUser.email) {
      setUsers([...users, { ...newUser, id: nextId }]);
      closeModal();
    }
  };

  const handleUpdate = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    closeModal();
  };

  const handleReset = () => {
    setModalData(isEditMode ? users.find((user) => user.id === modalData.id) : { name: '', mobile: '', email: '' });
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const filteredUsers = users.filter((user) => 
    user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
    user.mobile.includes(searchUser) ||
    user.id.toString().includes(searchUser)
  );

  return (
    <div id="container">
      <Header onAddClick={() => openModal(null, false, true)} />
      <Search searchUser={searchUser} setSearchUser={setSearchUser} />
      <UserList 
        users={filteredUsers} 
        onEditClick={(user) => openModal(user, true)} 
        onDeleteClick={handleDelete} 
        onViewClick={(user) => openModal(user)} 
      />
      {(modalData || isAddMode) && (
        <UserModal 
          modalData={modalData} 
          isEditMode={isEditMode} 
          isAddMode={isAddMode} 
          onClose={closeModal} 
          onInputChange={(field, value) => setModalData({ ...modalData, [field]: value })} 
          onSubmit={() => (isAddMode ? handleAdd(modalData) : handleUpdate(modalData))} 
          onReset={handleReset} 
        />
      )}
    </div>
  );
};

export default App;
