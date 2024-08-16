import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './homepage.jsx';
import Salem from './pages/a.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/a" element={<Salem />} />
        <Route path="/owner" element={<Salem />} />
        <Route path="/admin" element={<Salem />} />
        <Route path="/scods" element={<Salem />} />
        <Route path="/users" element={<Home />} />
      </Routes>
    </BrowserRouter>
);