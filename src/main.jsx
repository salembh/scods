import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './homepage.jsx';
import All from './pages/all.jsx';
import ResetPassword from './pages/reset.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/all" element={<All />} />
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
);