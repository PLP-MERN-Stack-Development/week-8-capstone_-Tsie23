import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';
import User from '../models/User.js';

dotenv.config();

const projectsData = [
  {
    id: 'mern',
    name: 'MERN Stack Web App',
    description: 'Full-stack web application using MongoDB, Express.js, React.js, and Node.js with authentication and CRUD operations',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT'],
    color: 'bg-gradient-to-r from-green-500 to-blue-500',
    icon: 'Database',
    difficulty: 'intermediate',
    estimatedHours: 15,
    featured: true,
    tags: ['full-stack', 'authentication', 'database', 'api'],
    prerequisites: ['Basic JavaScript', 'HTML/CSS', 'Node.js basics'],
    learningObjectives: [
      'Build a complete full-stack application',
      'Implement user authentication with JWT',
      'Create RESTful APIs with Express.js',
      'Work with MongoDB database',
      'Handle state management in React'
    ],
    fileStructure: [
      {
        name: 'mern-project',
        type: 'folder',
        path: '/',
        description: 'Root project directory containing both client and server',
        platform: 'File System',
        dependencies: [],
        order: 1,
        children: [
          {
            name: 'client',
            type: 'folder',
            path: '/client',
            description: 'Frontend React application with Vite',
            platform: 'React.js',
            dependencies: [],
            order: 2,
            children: [
              {
                name: 'package.json',
                type: 'file',
                path: '/client/package.json',
                description: 'Frontend dependencies and build scripts',
                platform: 'npm',
                dependencies: [],
                order: 3,
                boilerplate: `{
  "name": "mern-client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.0",
    "lucide-react": "^0.344.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.2",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35"
  }
}`
              },
              {
                name: 'src',
                type: 'folder',
                path: '/client/src',
                description: 'React source code and components',
                platform: 'React.js',
                dependencies: [],
                order: 4,
                children: [
                  {
                    name: 'App.jsx',
                    type: 'file',
                    path: '/client/src/App.jsx',
                    description: 'Main React application component with routing',
                    platform: 'React.js',
                    dependencies: ['react', 'react-router-dom'],
                    order: 5,
                    boilerplate: `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;`
                  }
                ]
              }
            ]
          },
          {
            name: 'server',
            type: 'folder',
            path: '/server',
            description: 'Backend Node.js/Express API server',
            platform: 'Node.js',
            dependencies: [],
            order: 6,
            children: [
              {
                name: 'package.json',
                type: 'file',
                path: '/server/package.json',
                description: 'Backend dependencies and server scripts',
                platform: 'npm',
                dependencies: [],
                order: 7,
                boilerplate: `{
  "name": "mern-server",
  "version": "1.0.0",
  "description": "MERN stack backend API",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "express-validator": "^7.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}`
              },
              {
                name: 'server.js',
                type: 'file',
                path: '/server/server.js',
                description: 'Main Express server with middleware and routes',
                platform: 'Express.js',
                dependencies: ['express', 'mongoose', 'cors', 'dotenv'],
                order: 8,
                boilerplate: `import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mernapp')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'MERN API is running!' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`
              }
            ]
          }
        ]
      }
    ],
    codeFlow: [
      {
        step: 1,
        title: 'Project Setup',
        description: 'Initialize the project structure with separate client and server directories',
        files: ['package.json', 'client/package.json', 'server/package.json'],
        estimatedTime: 15
      },
      {
        step: 2,
        title: 'Backend Foundation',
        description: 'Set up Express server with MongoDB connection and basic middleware',
        files: ['server/server.js', 'server/.env'],
        code: 'Express server connects to MongoDB and handles CORS for frontend communication',
        estimatedTime: 30
      },
      {
        step: 3,
        title: 'Database Models',
        description: 'Create MongoDB schemas for users and application data',
        files: ['server/models/User.js', 'server/models/Project.js'],
        code: 'Mongoose models define data structure and validation rules',
        estimatedTime: 45
      },
      {
        step: 4,
        title: 'Authentication System',
        description: 'Implement JWT-based authentication with login and registration',
        files: ['server/routes/auth.js', 'server/middleware/auth.js'],
        code: 'JWT tokens secure API endpoints and manage user sessions',
        estimatedTime: 60
      },
      {
        step: 5,
        title: 'Frontend Setup',
        description: 'Create React application with routing and component structure',
        files: ['client/src/App.jsx', 'client/src/components/'],
        code: 'React Router handles navigation and component rendering',
        estimatedTime: 45
      },
      {
        step: 6,
        title: 'API Integration',
        description: 'Connect frontend to backend using Axios for HTTP requests',
        files: ['client/src/services/api.js', 'client/src/contexts/AuthContext.jsx'],
        code: 'Axios interceptors handle authentication tokens automatically',
        estimatedTime: 30
      }
    ],
    dependencies: ['Node.js', 'MongoDB', 'npm'],
    setupInstructions: [
      'Install Node.js (v18 or higher) and MongoDB',
      'Clone the project repository',
      'Run npm install in both client and server directories',
      'Create .env file in server directory with MongoDB URI and JWT secret',
      'Start MongoDB service on your system',
      'Run npm run dev in server directory to start backend',
      'Run npm run dev in client directory to start frontend',
      'Open http://localhost:5173 to view the application'
    ]
  },
  {
    id: 'frontend',
    name: 'Modern Frontend Website',
    description: 'Responsive frontend website built with React, Vite, and Tailwind CSS',
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'JavaScript'],
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    icon: 'Layout',
    difficulty: 'beginner',
    estimatedHours: 8,
    featured: true,
    tags: ['frontend', 'responsive', 'modern', 'ui'],
    prerequisites: ['Basic HTML/CSS', 'JavaScript fundamentals'],
    learningObjectives: [
      'Build responsive layouts with Tailwind CSS',
      'Create reusable React components',
      'Implement modern UI patterns',
      'Optimize for performance and accessibility'
    ],
    fileStructure: [],
    codeFlow: [],
    dependencies: ['Node.js', 'npm'],
    setupInstructions: [
      'Install Node.js (v18 or higher)',
      'Create new Vite project with React template',
      'Install Tailwind CSS and configure',
      'Set up component structure',
      'Run npm run dev to start development server'
    ]
  }
];

const usersData = [
  {
    name: 'Demo User',
    username: 'demo',
    email: 'demo@codecompass.com',
    password: 'demo123',
    isBeginnerMode: true,
    preferences: {
      darkMode: true,
      selectedProject: 'mern',
      notifications: true
    }
  },
  {
    name: 'Advanced User',
    username: 'advanced',
    email: 'advanced@codecompass.com',
    password: 'advanced123',
    isBeginnerMode: false,
    preferences: {
      darkMode: false,
      selectedProject: 'frontend',
      notifications: false
    }
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codecompass');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Insert projects
    await Project.insertMany(projectsData);
    console.log('Projects seeded successfully');

    // Insert users
    await User.insertMany(usersData);
    console.log('Users seeded successfully');

    console.log('Database seeded successfully!');
    console.log('Demo credentials:');
    console.log('Email: demo@codecompass.com');
    console.log('Password: demo123');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();