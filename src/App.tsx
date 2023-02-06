import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DisplayUserPage from './pages/DisplayUser/DisplayUserPage';
import SearchUserPage from './pages/SearchUser/SearchUser';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path='/' element={<SearchUserPage />} />
            <Route path='/:username' element={<DisplayUserPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
