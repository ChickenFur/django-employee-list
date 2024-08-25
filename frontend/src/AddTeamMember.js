import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTeamMember = () => {
  const navigate = useNavigate();
  const [member, setMember] = useState({ firstName: '', lastName: "", phone: "", role: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiURL =  process.env.NODE_ENV === 'development' ? "http://localhost:8000" : ""
    fetch(`${apiURL}/api/team/add/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(member),
    }).then(() => navigate('/'));
  };

  return (
    <div>
      <h1>Add Team Member</h1>
      <form onSubmit={handleSubmit}>
      <div>
        <label>
          First Name:
          <input type="text" name="firstName" value={member.firstName} onChange={handleChange} />
        </label>
        </div>
        <div>
          <label>
            Last Name:
            <input type="text" name="lastName" value={member.lastName} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Role:
            <input type="text" name="role" value={member.role} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Phone:
            <input type="text" name="phone" value={member.phone} onChange={handleChange} />
          </label>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTeamMember;