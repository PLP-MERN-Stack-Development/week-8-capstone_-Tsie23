import React, { useState } from 'react';

import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import { useAuth } from './hooks/useAuth';
import api from './services/api';


function App() {
  const { user, loading, isAuthenticated, login, logout } = useAuth();
  const [currentView, setCurrentView] = useState('home');
  const [showRegister, setShowRegister] = useState(false);

  const handleGetStarted = () => {
    setCurrentView('login');
  };

  const handleShowLogin = () => {
    setCurrentView('login');
  };

  const handleShowRegister = () => {
    setShowRegister(true);
  };

  const handleCloseModals = () => {
    setCurrentView('home');
    setShowRegister(false);
  };

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      setCurrentView('home');
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (formData) => {
    // Call backend API to register user
    const res = await api.post('/auth/register', formData);
    return res.data;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated && user) {
    return <>
      <Header user={user} onLogout={logout} />
      <Dashboard user={user} onLogout={logout} />
    </>;
  }

  return (
    <>
      <Header user={null} />
      <HomePage 
        onGetStarted={handleGetStarted}
        onLogin={handleShowLogin}
      />
      <LoginModal
        isOpen={currentView === 'login'}
        onClose={handleCloseModals}
        onLogin={handleLogin}
        onShowRegister={handleShowRegister}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={handleCloseModals}
        onRegister={handleRegister}
      />
    </>
  );
}

export default App;