import React, { useState, useEffect } from 'react';
import './App.css';
import userData from './users.json';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import UserList from './components/UserList/UserList';
import UserModal from './components/UserModal/UserModal';

const App = () => {
  const [users, setUsers] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setUsers(userData);
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
    } else {
      alert('error');
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
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div id="container">
      <Header onAddClick={() => openModal(null, false, true)} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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