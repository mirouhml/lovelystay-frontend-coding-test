import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import DisplayUserPage from './pages/DisplayUserPage';
import SearchUserPage from './pages/SearchUserPage';

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path='/' element={<SearchUserPage />} />
          <Route path='/:username' element={<DisplayUserPage />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
