import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DisplayUserPage from './pages/DisplayUser/DisplayUserPage';
import SearchUserPage from './pages/SearchUser/SearchUserPage';

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
