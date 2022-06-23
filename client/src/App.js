import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Secret from "./pages/secret";
import ProfilePicture from "./pages/ProfilePicture";
import "./App.css";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
    <Routes>
        {/* Hvorfor bruger man element og ikke component? */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Secret/>} />
        <Route path="/profilePicture" element={<ProfilePicture/>} />
    </Routes>

    </BrowserRouter>
  )
}

export default App