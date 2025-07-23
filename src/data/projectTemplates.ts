import { ProjectTemplate } from '../types';

export const projectTemplates: ProjectTemplate[] = [
  {
    id: 'mern-stack',
    name: 'MERN Stack Project',
    description: 'Full-stack web application with MongoDB, Express.js, React, and Node.js',
    category: 'fullstack',
    difficulty: 'intermediate',
    fileStructure: [
      {
        id: 'root',
        name: 'my-mern-app',
        type: 'folder',
        path: '/',
        order: 1,
        description: 'Root project directory',
        tool: 'File System',
        children: [
          {
            id: 'client',
            name: 'client',
            type: 'folder',
            path: '/client',
            order: 2,
            description: 'React frontend application',
            tool: 'React',
            children: [
              {
                id: 'package-json-client',
                name: 'package.json',
                type: 'file',
                path: '/client/package.json',
                order: 3,
                description: 'Frontend dependencies and scripts',
                tool: 'npm',
                boilerplate: `{
  "name": "mern-client",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.4.0"
  }
}`
              },
              {
                id: 'src-folder',
                name: 'src',
                type: 'folder',
                path: '/client/src',
                order: 4,
                description: 'Source code for React components',
                tool: 'React',
                children: [
                  {
                    id: 'app-js',
                    name: 'App.js',
                    type: 'file',
                    path: '/client/src/App.js',
                    order: 5,
                    description: 'Main React component',
                    tool: 'React',
                    exports: ['App'],
                    boilerplate: `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>MERN Stack App</h1>
    </div>
  );
}

export default App;`
                  },
                  {
                    id: 'index-js',
                    name: 'index.js',
                    type: 'file',
                    path: '/client/src/index.js',
                    order: 6,
                    description: 'Entry point for React application',
                    tool: 'React',
                    imports: ['App'],
                    boilerplate: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`
                  }
                ]
              }
            ]
          },
          {
            id: 'server',
            name: 'server',
            type: 'folder',
            path: '/server',
            order: 7,
            description: 'Node.js backend with Express',
            tool: 'Node.js',
            children: [
              {
                id: 'package-json-server',
                name: 'package.json',
                type: 'file',
                path: '/server/package.json',
                order: 8,
                description: 'Backend dependencies and scripts',
                tool: 'npm',
                boilerplate: `{
  "name": "mern-server",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "cors": "^2.8.5"
  }
}`
              },
              {
                id: 'server-js',
                name: 'server.js',
                type: 'file',
                path: '/server/server.js',
                order: 9,
                description: 'Express server setup and configuration',
                tool: 'Express.js',
                imports: ['express', 'mongoose'],
                boilerplate: `const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mern-app');

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`
              }
            ]
          }
        ]
      }
    ],
    dependencies: [
      {
        from: '/client/src/index.js',
        to: '/client/src/App.js',
        type: 'import',
        description: 'Main entry point imports the App component'
      },
      {
        from: '/client/src/App.js',
        to: '/server/server.js',
        type: 'api',
        description: 'Frontend makes API calls to backend server'
      }
    ],
    codeFlow: [
      {
        id: 'step-1',
        title: 'Project Setup',
        description: 'Initialize both client and server directories with package.json files',
        files: ['/client/package.json', '/server/package.json'],
        order: 1
      },
      {
        id: 'step-2',
        title: 'React App Initialization',
        description: 'Create the main React components and entry point',
        files: ['/client/src/index.js', '/client/src/App.js'],
        order: 2
      },
      {
        id: 'step-3',
        title: 'Express Server Setup',
        description: 'Configure Express server with middleware and database connection',
        files: ['/server/server.js'],
        order: 3
      }
    ]
  },
  {
    id: 'frontend-website',
    name: 'Frontend Website',
    description: 'Static website using HTML, CSS, and JavaScript',
    category: 'frontend',
    difficulty: 'beginner',
    fileStructure: [
      {
        id: 'frontend-root',
        name: 'my-website',
        type: 'folder',
        path: '/',
        order: 1,
        description: 'Root directory for frontend website',
        tool: 'File System',
        children: [
          {
            id: 'index-html',
            name: 'index.html',
            type: 'file',
            path: '/index.html',
            order: 2,
            description: 'Main HTML file - entry point of website',
            tool: 'HTML',
            boilerplate: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Welcome to My Website</h1>
    <script src="script.js"></script>
</body>
</html>`
          },
          {
            id: 'styles-css',
            name: 'styles.css',
            type: 'file',
            path: '/styles.css',
            order: 3,
            description: 'CSS styles for website appearance',
            tool: 'CSS',
            boilerplate: `body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
}

h1 {
    color: #333;
    text-align: center;
}`
          },
          {
            id: 'script-js',
            name: 'script.js',
            type: 'file',
            path: '/script.js',
            order: 4,
            description: 'JavaScript for interactive functionality',
            tool: 'JavaScript',
            boilerplate: `console.log('Website loaded successfully!');

document.addEventListener('DOMContentLoaded', function() {
    // Add interactive functionality here
});`
          }
        ]
      }
    ],
    dependencies: [
      {
        from: '/index.html',
        to: '/styles.css',
        type: 'import',
        description: 'HTML file links to CSS stylesheet'
      },
      {
        from: '/index.html',
        to: '/script.js',
        type: 'import',
        description: 'HTML file includes JavaScript file'
      }
    ],
    codeFlow: [
      {
        id: 'frontend-step-1',
        title: 'HTML Structure',
        description: 'Create the basic HTML structure and content',
        files: ['/index.html'],
        order: 1
      },
      {
        id: 'frontend-step-2',
        title: 'CSS Styling',
        description: 'Add styles to make the website visually appealing',
        files: ['/styles.css'],
        order: 2
      },
      {
        id: 'frontend-step-3',
        title: 'JavaScript Interactivity',
        description: 'Add interactive features and functionality',
        files: ['/script.js'],
        order: 3
      }
    ]
  }
];

export const getTemplateById = (id: string): ProjectTemplate | undefined => {
  return projectTemplates.find(template => template.id === id);
};