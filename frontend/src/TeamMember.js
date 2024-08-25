import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TeamMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState({ name: '', role: '' });

  useEffect(() => {
    const apiURL =  process.env.NODE_ENV === 'development' ? "http://localhost:8000" : ""
    fetch(`${apiURL}/api/team/${id}/`)
      .then(response => response.json())
      .then(data => setMember(data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     const apiURL =  process.env.NODE_ENV === 'development' ? "http://localhost:8000" : ""
    fetch(`${apiURL}/api/team/put/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(member),
    }).then(() => navigate('/'));
  };

  return (
    <div>
      <h1>Edit Team Member</h1>
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default TeamMember;