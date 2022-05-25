import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatroom from "./Chatroom"
import Register from './pages/Register';
import Login from './pages/Login';
import Secret from './pages/secret'
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        {/* Hvorfor bruger man element og ikke component? */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chatroom" element={<Chatroom />} />
        <Route path="/" element={<Secret/>} />
    </Routes>

    </BrowserRouter>
  )
}

export default App