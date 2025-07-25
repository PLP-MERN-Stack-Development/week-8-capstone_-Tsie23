import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Template from '../models/Template.js';
import GlossaryTerm from '../models/GlossaryTerm.js';
import connectDB from '../config/database.js';

dotenv.config();

const seedTemplates = [
  {
    name: 'MERN Stack Project',
    description: 'Full-stack web application with MongoDB, Express.js, React, and Node.js',
    category: 'fullstack',
    difficulty: 'intermediate',
    tags: ['react', 'node', 'mongodb', 'express'],
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
    name: 'Frontend Website',
    description: 'Static website using HTML, CSS, and JavaScript',
    category: 'frontend',
    difficulty: 'beginner',
    tags: ['html', 'css', 'javascript'],
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

const seedGlossaryTerms = [
  {
    term: 'API',
    definition: 'Application Programming Interface - a set of protocols and tools for building software applications',
    category: 'Backend',
    examples: ['REST API', 'GraphQL API'],
    relatedTerms: ['REST', 'endpoint', 'HTTP'],
    difficulty: 'beginner'
  },
  {
    term: 'Component',
    definition: 'A reusable piece of code that returns a React element to be rendered to the page',
    category: 'Frontend',
    examples: ['function Button() { return <button>Click me</button>; }'],
    relatedTerms: ['React', 'JSX', 'props'],
    difficulty: 'beginner'
  },
  {
    term: 'State',
    definition: 'Data that changes over time in your application and affects what is displayed to the user',
    category: 'Frontend',
    examples: ['const [count, setCount] = useState(0);'],
    relatedTerms: ['React', 'useState', 'props'],
    difficulty: 'beginner'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('Clearing existing data...');
    await Template.deleteMany({});
    await GlossaryTerm.deleteMany({});
    
    console.log('Seeding templates...');
    await Template.insertMany(seedTemplates);
    
    console.log('Seeding glossary terms...');
    await GlossaryTerm.insertMany(seedGlossaryTerms);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();