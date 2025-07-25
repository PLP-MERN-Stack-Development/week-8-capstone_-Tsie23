import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

const UserContext = createContext(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('beginner');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authAPI.getCurrentUser();
          if (response.success) {
            setUser(response.data.user);
            setMode(response.data.user.mode);
          }
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initializeUser();
  }, []);

  const signIn = async (userData, token) => {
    setUser(userData);
    setMode(userData.mode);
    localStorage.setItem('token', token);
  };

  const signOut = () => {
    setUser(null);
    setMode('beginner');
    localStorage.removeItem('token');
  };

  const updateProgress = async (templateId, completedSteps) => {
    if (!user) return;
    
    try {
      await authAPI.updateProgress(templateId, completedSteps);
      
      // Update local state
      const updatedUser = {
        ...user,
        progress: user.progress.map(p => 
          p.templateId === templateId 
            ? { ...p, completedSteps, lastAccessedAt: new Date() }
            : p
        )
      };
      
      // If template not in progress, add it
      if (!user.progress.find(p => p.templateId === templateId)) {
        updatedUser.progress.push({
          templateId,
          completedSteps,
          lastAccessedAt: new Date()
        });
      }
      
      setUser(updatedUser);
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const getUserProgress = (templateId) => {
    return user?.progress?.find(p => p.templateId === templateId);
  };

  const updateMode = async (newMode) => {
    if (!user) return;
    
    try {
      await authAPI.updateProfile({ mode: newMode });
      setMode(newMode);
      setUser({ ...user, mode: newMode });
    } catch (error) {
      console.error('Failed to update mode:', error);
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      mode, 
      loading,
      setMode: updateMode, 
      signIn, 
      signOut, 
      updateProgress, 
      getUserProgress 
    }}>
      {children}
    </UserContext.Provider>
  );
};