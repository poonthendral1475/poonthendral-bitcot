import React from 'react';
import './UserModal.css'
const UserModal = ({ modalData, isEditMode, isAddMode, onClose, onInputChange, onSubmit, onReset }) => (
  <div id="modal_main">
    <div id="modal">
      <button onClick={onClose} id="close_button">X</button>
      {isAddMode || isEditMode ? (
        <div className='add_user'>
          <h2>{isAddMode ? 'Add Contact' : 'Edit User'}</h2>
          <div className='add_user_form'>
            <div className='add_user_form_data'>
              <label htmlFor='modal_input_name'>Name : </label>
              <input
                type="text"
                value={modalData.name || ''}
                onChange={(e) => onInputChange('name', e.target.value)}
                id="modal_input_name"
              />
            </div>
            <div className='add_user_form_data'>
              <label htmlFor='modal_input_mobile'>Mobile : </label>
              <input
                type="text"
                value={modalData.mobile || ''}
                onChange={(e) => onInputChange('mobile', e.target.value)}
                id="modal_input_mobile"
              />
            </div>
            <div className='add_user_form_data'>
              <label htmlFor='modal_input_email'>Email : </label>
              <input
                type="text"
                value={modalData.email || ''}
                onChange={(e) => onInputChange('email', e.target.value)}
                id="modal_input_email"
              />
            </div>
          </div>
          <button onClick={onSubmit} id="modal_button">{isAddMode ? 'Submit' : 'Update'}</button>
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

export default UserModal;
