// This file now serves as fallback data when API is not available
export const projectTemplates = [
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
      }
    ],
    codeFlow: [
      {
        id: 'step-1',
        title: 'Project Setup',
        description: 'Initialize both client and server directories with package.json files',
        files: ['/client/package.json', '/server/package.json'],
        order: 1
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
      }
    ],
    codeFlow: [
      {
        id: 'frontend-step-1',
        title: 'HTML Structure',
        description: 'Create the basic HTML structure and content',
        files: ['/index.html'],
        order: 1
      }
    ]
  }
];

export const getTemplateById = (id) => {
  return projectTemplates.find(template => template.id === id);
};