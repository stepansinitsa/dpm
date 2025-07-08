import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import AddHotelPage from './pages/AddHotelPage';
import EditHotelPage from './pages/EditHotelPage';
import SupportChat from './pages/SupportChat';
import ManagerSupportChats from './pages/ManagerSupportChats';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/add-hotel/:id?" element={<AddHotelPage />} />
        <Route path="/edit-hotel/:id" element={<EditHotelPage />} />
        <Route path="/support-chat" element={<SupportChat />} />
        <Route path="/manager/support-chats" element={<ManagerSupportChats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;