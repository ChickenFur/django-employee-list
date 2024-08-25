import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TeamList = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  
  useEffect(() => {
    const apiURL =  process.env.NODE_ENV === 'development' ? "http://localhost:8000" : ""
    fetch(`${apiURL}/api/team/`)
      .then(response => response.json()).catch(err => {
        console.log(err)
      })
      .then(data => setTeamMembers(data));
  }, []);

  return (
    <div className="list-page">
    <h1>List page</h1>
    <div className="team-members-container">
      <h2>Team members</h2>
      <p>You have {teamMembers.length} team members.</p>
      <ul className="team-member-list">
        {teamMembers.map(member => (
          <li key={member.id} className="team-member-item">
            <Link to={`/team/${member.id}`} className="team-member-link" >
              <img src={member.avatar || '/static/default-avatar.png'} alt={`${member.firstName} ${member.lastName}`} className="avatar" />
              <div className="member-info">
                <strong>{member.firstName} {member.lastName}{member.role === 'admin' && '  (admin)'} </strong>
                <p>{member.phone}</p>
                <p>{member.email}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <Link to="/team/add" className="add-member-button">+</Link>
    <style jsx>{`
        .list-page {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          position: relative;
        }

        h1, h2 {
          margin-bottom: 10px;
        }

        .team-members-container {
          background-color: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .team-member-list {
          list-style-type: none;
          padding: 0;
        }

        .team-member-item {
          display: flex;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }

        .team-member-item:last-child {
          border-bottom: none;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 15px;
        }

        .member-info {
          flex-grow: 1;
        }

        .member-info p {
          margin: 0;
          color: #666;
        }

        .add-member-button {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 30px;
          height: 30px;
          background-color: #007bff;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 20px;
        }

        .team-member-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }

        .team-member-link:hover {
          background-color: #f0f0f0;
        }
      `}</style>
  </div>
  
  );
};

export default TeamList;