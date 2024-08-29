import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "./API.tsx";
import { Member } from "./TeamMemberTypes.tsx";

const TeamMemberForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAddMode = location.pathname.includes("/add");
  const [member, setMember] = useState<Member>({
    id: undefined,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "Regular",
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isAddMode) {
      setLoading(true);
      const memberId = location.pathname.split("/").pop();
      if (memberId) {
        API.teamMember
          .get(memberId)
          .then((response) => response.json())
          .then((data) => {
            setMember(data);
            setLoading(false);
          });
      }
    }
  }, [isAddMode, location.pathname]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleDelete = () => {
    const memberId = location.pathname.split("/").pop();
    if (memberId) {
      API.teamMember.delete(memberId).then(() => navigate("/"));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAddMode) {
      API.teamMember.post(member).then(() => navigate("/"));
    } else {
      API.teamMember.put(member).then(() => navigate("/"));
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-div"></div>
        <div className="loading-div"></div>
        <div className="loading-div"></div>
      </div>
    );
  }

  return (
    <div className="add-page">
      <h1>{isAddMode ? "Add" : "Edit"} page</h1>
      <div className="form-container">
        <h2>Add a team member</h2>
        <p>Set email, location and role.</p>
        <form onSubmit={handleSubmit}>
          <h3>Info</h3>
          <input
            type="text"
            name="firstName"
            value={member.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
            minLength={2}
            maxLength={30}
          />
          <input
            type="text"
            name="lastName"
            value={member.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
            minLength={2}
            maxLength={30}
          />
          <input
            type="email"
            name="email"
            value={member.email}
            onChange={handleChange}
            placeholder="Email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          <input
            type="tel"
            name="phone"
            value={member.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            pattern="^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$"
          />

          <h3>Role</h3>
          <div className="role-options">
            <label>
              <input
                type="radio"
                name="role"
                value="Regular"
                checked={member.role !== "admin"}
                onChange={handleChange}
              />
              Regular - Can't delete members
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={member.role === "admin"}
                onChange={handleChange}
              />
              Admin - Can delete members
            </label>
          </div>

          <div className="button-container">
            {!isAddMode && (
              <button
                type="button"
                className="delete-button"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
        </form>
      </div>
      <style>{`
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
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1,
        h2,
        h3 {
          margin-bottom: 10px;
        }
        input[type="text"],
        input[type="email"],
        input[type="tel"] {
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
