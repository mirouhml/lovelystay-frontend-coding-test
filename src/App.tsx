import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DisplayUserPage from './pages/DisplayUserPage';
import SearchUserPage from './pages/SearchUserPage';

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SearchUserPage />} />
          <Route path='/:username' element={<DisplayUserPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
