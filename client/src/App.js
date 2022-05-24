import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatroom from "./Chatroom"
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        {/* Hvorfor bruger man element og ikke component? */}
        <Route path="/register" element={<Register />} />
        <Route path="/chatroom" element={<Chatroom />} />
    </Routes>

    </BrowserRouter>
  )
}

export default App