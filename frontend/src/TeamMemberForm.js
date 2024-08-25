import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCookie } from './Utils';

const TeamMemberForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAddMode = location.pathname.includes('/add');
  const [member, setMember] = useState({ firstName: '', lastName: '', email: '', phone: '', role: 'Regular' });

  useEffect(() => {
    if (!isAddMode) {
      const memberId = location.pathname.split('/').pop();
      const apiURL = process.env.NODE_ENV === 'development' ? "http://localhost:8000" : "";
      fetch(`${apiURL}/api/team/${memberId}/`)
        .then(response => response.json())
        .then(data => setMember(data));
    }
  }, [isAddMode, location.pathname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleDelete = () => {
    const apiURL = process.env.NODE_ENV === 'development' ? "http://localhost:8000" : "";
    const memberId = location.pathname.split('/').pop();
    const csrfToken = getCookie('csrftoken');
    fetch(`${apiURL}/api/team/delete/${memberId}/`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      }
    }).then(() => navigate('/'));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const apiURL = process.env.NODE_ENV === 'development' ? "http://localhost:8000" : "";
    const url = isAddMode ? `${apiURL}/api/team/add/` : `${apiURL}/api/team/put/`;
    const method = isAddMode ? 'POST' : 'PUT';
    const csrfToken = getCookie('csrftoken');

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify(member),
    }).then(() => navigate('/'));
  };

  return (
    <div className="add-page">
      <h1>{isAddMode ? "Add" : "Edit"} page</h1>
      <div className="form-container">
        <h2>Add a team member</h2>
        <p>Set email, location and role.</p>
        <form onSubmit={handleSubmit}>
          <h3>Info</h3>
          <input type="text" name="firstName" value={member.firstName} onChange={handleChange} placeholder="First Name" />
          <input type="text" name="lastName" value={member.lastName} onChange={handleChange} placeholder="Last Name" />
          <input type="email" name="email" value={member.email} onChange={handleChange} placeholder="Email" />
          <input type="tel" name="phone" value={member.phone} onChange={handleChange} placeholder="Phone" />
          
          <h3>Role</h3>
          <div className="role-options">
            <label>
              <input type="radio" name="role" value="Regular" checked={member.role !== 'admin'} onChange={handleChange} />
              Regular - Can't delete members
            </label>
            <label>
              <input type="radio" name="role" value="admin" checked={member.role === 'admin'} onChange={handleChange} />
              Admin - Can delete members
            </label>
          </div>
          
          
          <div className="button-container">
            {!isAddMode && <button type="button" className="delete-button" onClick={handleDelete}>Delete</button>}
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
      <style jsx>{`
        .add-page {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .form-container {
          background-color: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1, h2, h3 {
          margin-bottom: 10px;
        }
        input[type="text"], input[type="email"], input[type="tel"] {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .role-options {
          margin-bottom: 20px;
        }
        .role-options label {
          display: block;
          margin-bottom: 10px;
        }
          .button-container {
            display: flex;
            justify-content: space-between;
            margin-top: 20px; /* Optional: Add some space above the buttons */
          }
        .save-button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
        }
        .delete-button {
          background-color: white;
          color: red;
          padding: 10px 20px;
          border-radius: 4px;
          border-width: 1px;
          cursor: pointer;
        }
        .delete-button:hover {
           background-color: #c82333;
           color: white;
        }
      `}</style>
    </div>
  );
};

export default TeamMemberForm;