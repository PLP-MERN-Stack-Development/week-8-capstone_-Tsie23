import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, User, Compass, Menu, X, LogOut } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import { Button } from '../ui/Button';
import { AuthModal } from '../auth/AuthModal';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, mode, setMode, signOut } = useUser();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [authMode, setAuthMode] = React.useState('signin');

  const handleSignIn = () => {
    setAuthMode('signin');
    setShowAuthModal(true);
  };

  const handleSignUp = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleSignOut = () => {
    signOut();
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/projects', label: 'Projects' },
    { path: '/glossary', label: 'Glossary' },
    { path: '/templates', label: 'Templates' },
  ];

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 px-2 sm:px-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                C<span className="inline-flex items-center justify-center">
                  <Compass className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mx-0.5" />
                </span>de Compass
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden lg:flex space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mode Toggle */}
              {user && (
                <div className="hidden sm:flex items-center space-x-2">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Mode:</span>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="bg-green-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                  </select>
                </div>
              )}

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-1.5 sm:p-2"
              >
                {theme === 'light' ? <Moon size={16} className="sm:w-5 sm:h-5" /> : <Sun size={16} className="sm:w-5 sm:h-5" />}
              </Button>

              {/* User Profile */}
              {user ? (
                <div className="hidden sm:flex items-center space-x-1 sm:space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User size={12} className="sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="p-1.5 sm:p-2"
                  >
                    <LogOut size={14} className="sm:w-4 sm:h-4" />
                  </Button>
                </div>
              ) : (
                <div className="hidden sm:flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs sm:text-sm"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1.5"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Mobile Mode Toggle */}
                {user && (
                  <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Mode:</span>
                      <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="bg-green-600 text-white text-sm px-3 py-1 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                      </select>
                    </div>
                  </div>
                )}
                
                {/* Mobile Auth Buttons */}
                {user ? (
                  <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <User size={16} className="text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {user.name}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSignOut}
                        className="p-2"
                      >
                        <LogOut size={16} />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 mt-2 pt-2 space-y-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full text-left justify-start"
                      onClick={() => {
                        handleSignIn();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        handleSignUp();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};