import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Glossary } from './pages/Glossary';
import { Templates } from './pages/Templates';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/templates" element={<Templates />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;