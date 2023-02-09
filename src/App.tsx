import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DisplayUserPage from './pages/DisplayUserPage';
import SearchUserPage from './pages/SearchUserPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <main>
      <Routes>
        <Route path='/' element={<SearchUserPage />} />
        <Route path='/:username' element={<DisplayUserPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}

export default App;
