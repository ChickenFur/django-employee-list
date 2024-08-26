import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TeamList from "./TeamList.tsx";
import TeamMemberForm from "./TeamMemberForm.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TeamList />} />
        <Route path="/team/add" element={<TeamMemberForm />} />
        <Route path="/team/:id" element={<TeamMemberForm />} />
      </Routes>
    </Router>
  );
};

export default App;
