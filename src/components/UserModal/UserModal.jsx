import React, { useState } from 'react';
import './UserModal.css';

const UserModal = ({ modalData, isEditMode, isAddMode, onClose, onInputChange, onSubmit, onReset }) => {
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!modalData.name || modalData.name.trim() === '') {
      newErrors.name = 'Name is required';
    }
    if (!modalData.mobile || modalData.mobile.trim() === '') {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d+$/.test(modalData.mobile)) {
      newErrors.mobile = 'Mobile number must only contain digits';
    }
    if (!modalData.email || modalData.email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(modalData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = () => {
    if (validateFields()) {
      onSubmit();
    }
  };

  return (
    <div id="modal_main">
      <div id="modal">
        <button onClick={onClose} id="close_button">X</button>
        {isAddMode || isEditMode ? (
          <div className='add_user'>
            <h2>{isAddMode ? 'Add Contact' : 'Edit Contact'}</h2>
            <div className='add_user_form'>
              <div className='add_user_form_data'>
                <label htmlFor='modal_input_name'>Name : </label>
                <input
                  type="text"
                  value={modalData.name || ''}
                  onChange={(e) => onInputChange('name', e.target.value)}
                  id="modal_input_name"
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className='add_user_form_data'>
                <label htmlFor='modal_input_mobile'>Mobile : </label>
                <input
                  type="text"
                  value={modalData.mobile || ''}
                  onChange={(e) => onInputChange('mobile', e.target.value)}
                  id="modal_input_mobile"
                />
                {errors.mobile && <span className="error">{errors.mobile}</span>}
              </div>
              <div className='add_user_form_data'>
                <label htmlFor='modal_input_email'>Email : </label>
                <input
                  type="text"
                  value={modalData.email || ''}
                  onChange={(e) => onInputChange('email', e.target.value)}
                  id="modal_input_email"
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
            </div>
            <button onClick={handleSubmit} id="modal_button">{isAddMode ? 'Submit' : 'Update'}</button>
            <button onClick={onReset} className="modal_button_reset">Reset</button>
          </div>
        ) : (
          <div className='view_user'>
            <div id='view_head'>
              <h2>Contact Details</h2>
            </div>
            <div id='entire_view'>
              <div id='view_data'>
                <div className='view_flex'>
                  <h5>Name :</h5>
                  <p>{modalData.name}</p>
                </div>
                <div className='view_flex'>
                  <h5>Mobile :</h5>
                  <p>{modalData.mobile}</p>
                </div>
                <div className='view_flex'>
                  <h5>Email :</h5>
                  <p>{modalData.email}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserModal;
