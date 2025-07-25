# Code Compass - Interactive Learning Tool

## 🎯 Project Overview

Code Compass is a comprehensive React-based web application designed to help beginner and self-taught coders learn how to structure full coding projects. The platform provides interactive file structure visualization, dependency mapping, and step-by-step guidance for building real-world applications.

### Real-World Problem Solved
Many beginner developers struggle with understanding how to organize and structure complete projects. They often know individual concepts but lack the knowledge of how files connect, what order to create them in, and how dependencies work in real applications. Code Compass bridges this gap by providing visual, interactive learning experiences.

## 🏗️ Technical Architecture

### Frontend Architecture
- **React 18** with JavaScript/JSX for modern component development
- **Vite** for fast development and building
- **Tailwind CSS** for responsive, utility-first styling
- **React Router** for client-side routing
- **Context API** for state management (Theme, User)
- **Axios** for API communication

### Backend Architecture
- **Node.js** with Express.js for server-side logic
- **MongoDB Atlas** for cloud database storage
- **Mongoose** for MongoDB object modeling
- **JWT** for secure authentication
- **Socket.io** for real-time features
- **bcryptjs** for password hashing

### Component Architecture
```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Modal.jsx
│   │   ├── Tooltip.jsx
│   │   └── Select.jsx
│   ├── layout/             # Layout components
│   │   └── Navbar.jsx
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── FileStructureView.jsx
│   │   ├── CodeFlowView.jsx
│   │   └── DependenciesView.jsx
│   ├── auth/               # Authentication components
│   │   └── AuthModal.jsx
│   └── home/               # Homepage components
│       └── Hero.jsx
├── contexts/               # React Context providers
│   ├── ThemeContext.jsx
│   └── UserContext.jsx
├── pages/                  # Page components
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   ├── Projects.jsx
│   ├── Glossary.jsx
│   └── Templates.jsx
├── data/                   # Static data and fallback
│   ├── projectTemplates.js
│   └── glossaryTerms.js
├── utils/                  # Utility functions
│   ├── api.js
│   └── socket.js
└── hooks/                  # Custom React hooks
    ├── useTemplates.js
    ├── useGlossary.js
    └── useSocket.js
```

### Database Schema (MongoDB Atlas)

#### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  password: String (hashed),
  mode: String (enum: ['beginner', 'intermediate']),
  progress: [{
    templateId: ObjectId (ref: 'Template'),
    completedSteps: [String],
    lastAccessedAt: Date,
    timeSpent: Number
  }],
  preferences: {
    theme: String (enum: ['light', 'dark']),
    notifications: Boolean,
    language: String
  },
  isActive: Boolean,
  lastLoginAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### Template Collection
```javascript
{
  _id: ObjectId,
  name: String (indexed),
  slug: String (unique, indexed),
  description: String,
  category: String (enum, indexed),
  difficulty: String (enum, indexed),
  tags: [String] (indexed),
  fileStructure: [{
    id: String,
    name: String,
    type: String (enum: ['file', 'folder']),
    path: String,
    order: Number,
    description: String,
    boilerplate: String,
    tool: String,
    children: [FileNode],
    imports: [String],
    exports: [String]
  }],
  dependencies: [{
    from: String,
    to: String,
    type: String (enum),
    description: String
  }],
  codeFlow: [{
    id: String,
    title: String,
    description: String,
    files: [String],
    order: Number
  }],
  metadata: {
    estimatedTime: Number,
    prerequisites: [String],
    learningObjectives: [String]
  },
  isPublished: Boolean,
  stats: {
    views: Number,
    completions: Number,
    rating: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### GlossaryTerm Collection
```javascript
{
  _id: ObjectId,
  term: String (unique, text indexed),
  definition: String (text indexed),
  category: String (indexed),
  examples: [String],
  relatedTerms: [String],
  difficulty: String (enum),
  tags: [String],
  isPublished: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Features

### ✅ Completed Features
- **Interactive Homepage** with hero section and feature showcase
- **Light Mode Default** with dark mode toggle
- **Mobile-Responsive Design** with functional hamburger menu
- **User Authentication System** (sign up/sign in/sign out)
- **Progress Tracking** with visual indicators and persistence
- **Dashboard** with project guides and glossary
- **Project Template System** with auto-generated structures
- **Visual File Structure** in creation order with tooltips
- **File Dependency Mapping** showing relationships
- **Interactive Code Modals** with boilerplate code
- **Step-by-Step Code Flow** explanations
- **Beginner/Intermediate Mode** toggle
- **Comprehensive Programming Glossary** with search
- **Real-time Updates** with Socket.io integration
- **MongoDB Atlas Integration** for data persistence
- **RESTful API** with proper error handling
- **JWT Authentication** with secure token management

### 🔄 In Development
- Advanced project templates (Firebase, Next.js)
- Real-time collaboration features
- Advanced progress analytics
- Code generation tools

### 📋 Planned Features
- Mobile app development
- Community features and sharing
- Integration with development tools
- Enterprise features

## 📱 Responsive Design

The application is built with a mobile-first approach:
- **Mobile (320px+)**: Stacked layout, functional hamburger menu
- **Tablet (768px+)**: Grid layouts, expanded navigation
- **Desktop (1024px+)**: Full sidebar, multi-column layouts
- **Large Desktop (1280px+)**: Optimized spacing and typography

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb) for main actions and highlights
- **Secondary**: Gray scale for text and backgrounds
- **Success**: Green for completed items and progress
- **Accent**: Purple, Orange for categories and states
- **Light Mode**: Default clean, bright interface
- **Dark Mode**: Navy/Gray theme for reduced eye strain

### Typography
- **Headings**: Inter font family, bold weights
- **Body**: Inter font family, regular weight
- **Code**: JetBrains Mono for code snippets

## 🔐 Authentication & Security

### Authentication Flow
- **Registration**: Email, password, name, learning mode selection
- **Login**: Email and password authentication
- **JWT Tokens**: Secure session management
- **Password Hashing**: bcryptjs with salt rounds
- **Session Persistence**: Local storage with automatic refresh

### Security Features
- **Input Validation**: Server-side validation with express-validator
- **Rate Limiting**: API endpoint protection
- **CORS Configuration**: Secure cross-origin requests
- **Helmet.js**: Security headers
- **Password Requirements**: Minimum length and complexity

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/code-compass.git

# Navigate to project directory
cd code-compass

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB Atlas connection string and JWT secret

# Seed the database (optional)
npm run seed

# Start development servers (both client and server)
npm run dev

# Or start individually
npm run client  # Frontend only
npm run server  # Backend only
```

### Environment Variables
```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codecompass

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# Client Configuration
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 🧪 Testing

### Available Test Scripts
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e
```

### Testing Strategy
- **Unit Tests**: Component and function testing with Jest
- **Integration Tests**: API endpoint testing with Supertest
- **E2E Tests**: User flow testing (planned)
- **Manual Testing**: Cross-device and browser testing

## 🚀 Deployment

### Live Application
The application is deployed and accessible at: [https://astonishing-tulumba-084564.netlify.app](https://astonishing-tulumba-084564.netlify.app)

### Deployment Architecture
- **Frontend**: Netlify (Static hosting)
- **Backend**: Railway/Render (Node.js hosting)
- **Database**: MongoDB Atlas (Cloud database)
- **CDN**: Netlify Edge Network

### Build Commands
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Netlify (automatic via Git)
git push origin main
```

## 📊 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Template Endpoints
- `GET /api/templates` - Get all templates
- `GET /api/templates/:id` - Get template by ID
- `GET /api/templates/slug/:slug` - Get template by slug
- `GET /api/templates/categories/stats` - Get category statistics

### User Progress Endpoints
- `GET /api/users/progress` - Get user progress
- `PUT /api/users/progress` - Update user progress
- `GET /api/users/stats` - Get user statistics

### Glossary Endpoints
- `GET /api/glossary` - Get all glossary terms
- `GET /api/glossary/search` - Search glossary terms
- `GET /api/glossary/categories` - Get all categories

## 🤝 Contributing

### Development Guidelines
- Follow JavaScript/JSX best practices
- Use conventional commit messages
- Write tests for new features
- Ensure responsive design
- Follow accessibility guidelines
- Test authentication flows thoroughly

### Getting Started
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (especially auth and mobile)
5. Submit a pull request

### Code Style
- Use ESLint configuration provided
- Follow React best practices
- Use functional components with hooks
- Implement proper error handling
- Write meaningful commit messages

## 📈 Performance Optimization

### Frontend Optimizations
- **Code Splitting**: Route-based lazy loading
- **Bundle Optimization**: Tree shaking and minification
- **Image Optimization**: Lazy loading and WebP format
- **Caching**: Service worker implementation (planned)
- **Virtual Scrolling**: For large data sets

### Backend Optimizations
- **Database Indexing**: Strategic indexes for queries
- **Connection Pooling**: MongoDB connection optimization
- **Rate Limiting**: API abuse prevention
- **Response Compression**: Gzip compression
- **Query Optimization**: Efficient database queries

## 🔍 Monitoring & Analytics

### Error Tracking
- Server-side error logging
- Client-side error boundaries
- API response monitoring
- User interaction tracking (planned)

### Performance Monitoring
- Database query performance
- API response times
- Frontend bundle size tracking
- User experience metrics (planned)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React and Vite teams for excellent development tools
- MongoDB Atlas for reliable cloud database hosting
- Tailwind CSS for the utility-first CSS framework
- Lucide React for beautiful icons
- The open-source community for inspiration and resources

---

**Code Compass** - Helping developers navigate their coding journey, one project at a time. 🧭

*Built with ❤️ for the developer community*

## 📋 Task Completion Status

### ✅ Task 1: Project Planning & Design
- ✅ Real-world problem identified and solved
- ✅ UI wireframes and mockups implemented
- ✅ MongoDB schema designed with relationships
- ✅ API endpoints planned and documented
- ✅ Project roadmap with milestones created
- ✅ Technical architecture decisions documented

### ✅ Task 2: Backend Development
- ✅ MongoDB Atlas setup with schemas and validation
- ✅ REST API built with Express.js (error handling + auth + middleware)
- ✅ Real-time features implemented with Socket.io
- ✅ Comprehensive backend testing framework
- ✅ Production-ready backend deployment

### ✅ Task 3: Frontend Development
- ✅ Responsive UI using React + Tailwind
- ✅ React Router for page routing implemented
- ✅ Reusable components + state management
- ✅ Frontend connected to backend API
- ✅ Forms, validation, error handling, and real-time updates

### ✅ Task 4: Testing & QA
- ✅ Unit tests for components/functions
- ✅ Integration tests for APIs
- ✅ Manual cross-device testing completed
- ✅ Accessibility standards implemented
- 🔄 End-to-end tests (in development)

### ✅ Task 5: Deployment & Documentation
- ✅ Backend + frontend deployed to production
- ✅ Monitoring + error tracking enabled
- ✅ Complete documentation included:
  - ✅ README (setup, usage)
  - ✅ API reference
  - ✅ User guide
  - ✅ Technical architecture overview
- 🔄 CI/CD pipelines (planned)