import { GlossaryTerm } from '../types';

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'api',
    term: 'API',
    definition: 'Application Programming Interface - a set of protocols and tools for building software applications',
    category: 'Backend',
    examples: ['REST API', 'GraphQL API'],
    relatedTerms: ['REST', 'endpoint', 'HTTP']
  },
  {
    id: 'component',
    term: 'Component',
    definition: 'A reusable piece of code that returns a React element to be rendered to the page',
    category: 'Frontend',
    examples: ['function Button() { return <button>Click me</button>; }'],
    relatedTerms: ['React', 'JSX', 'props']
  },
  {
    id: 'state',
    term: 'State',
    definition: 'Data that changes over time in your application and affects what is displayed to the user',
    category: 'Frontend',
    examples: ['const [count, setCount] = useState(0);'],
    relatedTerms: ['React', 'useState', 'props']
  },
  {
    id: 'middleware',
    term: 'Middleware',
    definition: 'Functions that execute during the request-response cycle in Express.js applications',
    category: 'Backend',
    examples: ['app.use(express.json())', 'app.use(cors())'],
    relatedTerms: ['Express', 'request', 'response']
  },
  {
    id: 'mongodb',
    term: 'MongoDB',
    definition: 'A NoSQL database that stores data in flexible, JSON-like documents',
    category: 'Database',
    examples: ['{ name: "John", age: 30 }'],
    relatedTerms: ['NoSQL', 'document', 'collection']
  },
  {
    id: 'jsx',
    term: 'JSX',
    definition: 'JavaScript XML - a syntax extension for JavaScript that allows you to write HTML-like code in React',
    category: 'Frontend',
    examples: ['const element = <h1>Hello, world!</h1>;'],
    relatedTerms: ['React', 'component', 'JavaScript']
  },
  {
    id: 'rest',
    term: 'REST',
    definition: 'Representational State Transfer - an architectural style for designing networked applications',
    category: 'Backend',
    examples: ['GET /users', 'POST /users', 'PUT /users/1', 'DELETE /users/1'],
    relatedTerms: ['API', 'HTTP', 'endpoint']
  },
  {
    id: 'props',
    term: 'Props',
    definition: 'Properties passed to React components to customize their behavior and appearance',
    category: 'Frontend',
    examples: ['<Button color="blue" size="large" />'],
    relatedTerms: ['React', 'component', 'state']
  }
];

export const getTermsByCategory = (category: string): GlossaryTerm[] => {
  return glossaryTerms.filter(term => term.category === category);
};

export const searchTerms = (query: string): GlossaryTerm[] => {
  const lowercaseQuery = query.toLowerCase();
  return glossaryTerms.filter(term => 
    term.term.toLowerCase().includes(lowercaseQuery) ||
    term.definition.toLowerCase().includes(lowercaseQuery)
  );
};