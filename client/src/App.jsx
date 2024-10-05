import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import LandingPage from './components/pages/Landing Page/LandingPage';
import RegisterPage from './components/pages/Register Page/RegisterPage';
import HomePage from './components/pages/Home Page/HomePage';
import ChatPage from './components/pages/Chat Page/ChatPage';

function App() {
  const [formData, setFormData] = useState ({
    name: '',
    email: '',
    password: '',
    companyName: '',
  });

  return (
    <div>
        <Router>
          <Routes>
            <Route path="/" element={ <LandingPage /> } />
            <Route path="/register" element={ <RegisterPage formData={formData} setFormData={setFormData}/> } />
            <Route path="/home" element={ <HomePage formData={formData}/> } />
            <Route path="/chat" element={ <ChatPage /> } />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
