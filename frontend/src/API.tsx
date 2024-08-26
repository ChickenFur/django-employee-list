import { Member } from "./TeamMemberTypes";

const apiURL =
  process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";

const API = {
  teamMember: {
    get: async (memberId?: string) => {
      if (memberId) {
        return fetch(`${apiURL}/api/team/${memberId}/`);
      } else {
        return fetch(`${apiURL}/api/team/`);
      }
    },
    post: async (member: Member) => {
      return fetch(`${apiURL}/api/team/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(member),
      });
    },
    put: async (member: Member) => {
      return fetch(`${apiURL}/api/team/put/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(member),
      });
    },
    delete: async (memberId: string) => {
      fetch(`${apiURL}/api/team/delete/${memberId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    avatarUrl:
      process.env.NODE_ENV === "development"
        ? "/default-avatar.png"
        : "/static/default-avatar.png",
  },
};

export default API;
