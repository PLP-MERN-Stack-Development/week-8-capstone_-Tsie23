import React, { useState } from 'react';
import { Moon, Sun, User, Settings, LogOut, Compass } from 'lucide-react';

function Header({
  darkMode,
  setDarkMode,
  isBeginnerMode,
  setIsBeginnerMode,
  user,
  onLogout
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-white flex items-center">
              C<Compass className="w-6 h-6 text-blue-400 mx-1" />de Compass
            </h1>
          </div>
          <span className="text-gray-400 text-sm">Interactive Learning Tool</span>
        </div>
        
        {user && (
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Dashboard</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Projects</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Glossary</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Templates</a>
          </nav>
        )}

        <div className="flex items-center space-x-4">
          {user && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Mode:</span>
              <button
                onClick={() => setIsBeginnerMode(!isBeginnerMode)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  isBeginnerMode 
                    ? 'bg-green-600 text-white' 
                    : 'bg-orange-600 text-white'
                }`}
              >
                {isBeginnerMode ? 'Beginner' : 'Intermediate'}
              </button>
            </div>
          )}
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-300">{user.name}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                  <div className="p-3 border-b border-gray-700">
                    <div className="text-white font-medium">{user.name}</div>
                    <div className="text-gray-400 text-sm">@{user.username}</div>
                    <div className="text-gray-400 text-sm">{user.email}</div>
                  </div>
                  <div className="p-1">
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;