import React, { useState } from 'react';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import LoginModal from './components/LoginModal';
import LoadingSpinner from './components/LoadingSpinner';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading, isAuthenticated, login, logout } = useAuth();
  const [currentView, setCurrentView] = useState('home');

  const handleGetStarted = () => {
    setCurrentView('login');
  };

  const handleShowLogin = () => {
    setCurrentView('login');
  };

  const handleCloseModals = () => {
    setCurrentView('home');
  };

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      setCurrentView('home');
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated && user) {
    return <Dashboard user={user} onLogout={logout} />;
  }

  return (
    <>
      <HomePage 
        onGetStarted={handleGetStarted}
        onLogin={handleShowLogin}
      />
      <LoginModal
        isOpen={currentView === 'login'}
        onClose={handleCloseModals}
        onLogin={handleLogin}
      />
    </>
  );
}

export default App;