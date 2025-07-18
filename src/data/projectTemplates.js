export const projectTemplates = [
  {
    id: 'mern-todo',
    name: 'MERN Todo App',
    description: 'A full-stack todo application using MongoDB, Express, React, and Node.js.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    files: [
      { id: 'server.js', name: 'server.js', content: '// Express server code...' },
      { id: 'App.jsx', name: 'App.jsx', content: '// React app code...' }
    ]
  },
  {
    id: 'react-dashboard',
    name: 'React Dashboard',
    description: 'A dashboard UI built with React and Tailwind CSS.',
    tech: ['React', 'Tailwind'],
    files: [
      { id: 'Dashboard.jsx', name: 'Dashboard.jsx', content: '// Dashboard code...' }
    ]
  }
  // Add more templates as needed
];