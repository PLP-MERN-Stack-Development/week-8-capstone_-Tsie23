import React, { createContext, useContext, useState } from 'react';
import { User, UserProgress } from '../types';

interface UserContextType {
  user: User | null;
  mode: 'beginner' | 'intermediate';
  setMode: (mode: 'beginner' | 'intermediate') => void;
  signIn: (user: User) => void;
  signOut: () => void;
  updateProgress: (templateId: string, completedSteps: string[]) => void;
  getUserProgress: (templateId: string) => UserProgress | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<'beginner' | 'intermediate'>('beginner');

  const signIn = (userData: User) => {
    setUser(userData);
    setMode(userData.mode);
  };

  const signOut = () => {
    setUser(null);
    setMode('beginner');
  };

  const updateProgress = (templateId: string, completedSteps: string[]) => {
    if (!user) return;
    
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
    // In a real app, this would sync with the backend
    localStorage.setItem('userProgress', JSON.stringify(updatedUser.progress));
  };

  const getUserProgress = (templateId: string): UserProgress | undefined => {
    return user?.progress.find(p => p.templateId === templateId);
  };
  return (
    <UserContext.Provider value={{ 
      user, 
      mode, 
      setMode, 
      signIn, 
      signOut, 
      updateProgress, 
      getUserProgress 
    }}>
      {children}
    </UserContext.Provider>
  );
};