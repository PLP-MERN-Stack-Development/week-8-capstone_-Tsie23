// This file now serves as fallback data when API is not available
export const glossaryTerms = [
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
  }
];

export const getTermsByCategory = (category) => {
  return glossaryTerms.filter(term => term.category === category);
};

export const searchTerms = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return glossaryTerms.filter(term => 
    term.term.toLowerCase().includes(lowercaseQuery) ||
    term.definition.toLowerCase().includes(lowercaseQuery)
  );
};