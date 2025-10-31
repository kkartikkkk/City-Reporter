import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Post from "../pages/Post";
import LandingPage from "../pages/LandingPage";
import ChatBot from "../pages/ChatBot"
import Admin from "../pages/Admin";
// import Render from '../layout/Render';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
       <Route path="/login" element={<Login />} />
       <Route path="/post" element={<Post />} />
       <Route path="/bot" element={<ChatBot />} />
      <Route path="/admin" element={<Admin />} />
      
    </Routes>
  </Router>
);

export default AppRouter;