import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeamList from './TeamList';
import TeamMemberForm from './TeamMemberForm';

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