# Technical Architecture Overview

## System Architecture

Code Compass follows a modern, scalable architecture designed for performance, maintainability, and user experience.

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React/Vite)  │◄──►│   (Node.js)     │◄──►│   (MongoDB)     │
│                 │    │   Express.js    │    │   Atlas         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         └──────────────►│   Socket.io     │◄─────────────┘
                        │   (Real-time)   │
                        └─────────────────┘
```

## Frontend Architecture

### Technology Stack
- **React 18**: Modern React with concurrent features
- **TypeScript**: Type safety and better developer experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Framer Motion**: Smooth animations and transitions

### Component Architecture
```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── Tooltip.tsx
│   │   └── Select.tsx
│   ├── layout/             # Layout components
│   │   └── Navbar.tsx
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── FileStructureView.tsx
│   │   ├── CodeFlowView.tsx
│   │   └── DependenciesView.tsx
│   └── home/               # Homepage components
│       └── Hero.tsx
├── contexts/               # React Context providers
│   ├── ThemeContext.tsx
│   └── UserContext.tsx
├── pages/                  # Page components
│   ├── Home.tsx
│   ├── Dashboard.tsx
│   └── Projects.tsx
├── data/                   # Static data and mock APIs
│   ├── projectTemplates.ts
│   └── glossaryTerms.ts
├── types/                  # TypeScript type definitions
│   └── index.ts
└── utils/                  # Utility functions
    └── api.ts
```

### State Management Strategy
- **React Context**: Global state (theme, user, settings)
- **Local State**: Component-specific state with useState
- **Server State**: API data with custom hooks
- **URL State**: Router state for navigation

### Design System
```typescript
// Color System
const colors = {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    900: '#1e3a8a'
  },
  gray: {
    50: '#f9fafb',
    500: '#6b7280',
    900: '#111827'
  }
}

// Typography Scale
const typography = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem'
}

// Spacing System (8px base)
const spacing = {
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  4: '1rem',     // 16px
  8: '2rem'      // 32px
}
```

## Backend Architecture (Planned)

### Technology Stack
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Socket.io**: Real-time communication
- **JWT**: Authentication tokens
- **bcrypt**: Password hashing

### API Architecture
```
server/
├── controllers/            # Request handlers
│   ├── authController.js
│   ├── templateController.js
│   └── userController.js
├── middleware/             # Custom middleware
│   ├── auth.js
│   ├── validation.js
│   └── errorHandler.js
├── models/                 # Database models
│   ├── User.js
│   ├── Template.js
│   └── Progress.js
├── routes/                 # API routes
│   ├── auth.js
│   ├── templates.js
│   └── users.js
├── services/               # Business logic
│   ├── authService.js
│   └── templateService.js
├── utils/                  # Utility functions
│   ├── database.js
│   └── logger.js
└── server.js              # Application entry point
```

### Database Design

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
  createdAt: Date,
  updatedAt: Date,
  lastLoginAt: Date
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
  createdBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

### API Design Patterns

#### RESTful Endpoints
```javascript
// Resource-based URLs
GET    /api/templates           # List templates
GET    /api/templates/:id       # Get specific template
POST   /api/templates           # Create template
PUT    /api/templates/:id       # Update template
DELETE /api/templates/:id       # Delete template

// Nested resources
GET    /api/users/:id/progress  # Get user progress
PUT    /api/users/:id/progress  # Update user progress
```

#### Response Format
```javascript
// Success Response
{
  success: true,
  data: {
    // Response data
  },
  meta: {
    pagination: {
      page: 1,
      limit: 20,
      total: 100
    }
  }
}

// Error Response
{
  success: false,
  error: {
    message: "Error description",
    code: "ERROR_CODE",
    details: {}
  }
}
```

## Real-time Features

### Socket.io Implementation
```javascript
// Server-side events
io.on('connection', (socket) => {
  // User joins their room
  socket.join(`user_${userId}`);
  
  // Progress updates
  socket.on('progress:update', (data) => {
    // Update database
    // Broadcast to user's devices
    io.to(`user_${userId}`).emit('progress:updated', data);
  });
  
  // Real-time notifications
  socket.on('notification:send', (data) => {
    io.to(`user_${data.userId}`).emit('notification', data);
  });
});
```

### Client-side Integration
```typescript
// React hook for Socket.io
const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  
  useEffect(() => {
    const newSocket = io(process.env.VITE_SOCKET_URL);
    setSocket(newSocket);
    
    return () => newSocket.close();
  }, []);
  
  return socket;
};
```

## Performance Optimization

### Frontend Optimizations
- **Code Splitting**: Route-based lazy loading
- **Bundle Optimization**: Tree shaking and minification
- **Image Optimization**: WebP format and lazy loading
- **Caching**: Service worker for offline functionality
- **Virtual Scrolling**: For large file structures

### Backend Optimizations
- **Database Indexing**: Strategic indexes for queries
- **Caching**: Redis for frequently accessed data
- **Connection Pooling**: MongoDB connection optimization
- **Rate Limiting**: Prevent API abuse
- **Compression**: Gzip response compression

### Database Optimization
```javascript
// Indexes for performance
db.templates.createIndex({ category: 1, difficulty: 1 });
db.templates.createIndex({ tags: 1 });
db.users.createIndex({ email: 1 }, { unique: true });
db.progress.createIndex({ userId: 1, templateId: 1 });

// Aggregation pipelines for complex queries
db.templates.aggregate([
  { $match: { category: 'fullstack' } },
  { $lookup: {
    from: 'progress',
    localField: '_id',
    foreignField: 'templateId',
    as: 'userProgress'
  }},
  { $addFields: {
    completionRate: { $avg: '$userProgress.completedSteps' }
  }}
]);
```

## Security Architecture

### Authentication & Authorization
```javascript
// JWT Token Structure
{
  header: {
    alg: 'HS256',
    typ: 'JWT'
  },
  payload: {
    userId: 'user_id',
    email: 'user@example.com',
    role: 'user',
    iat: 1640995200,
    exp: 1641081600
  }
}

// Middleware for protected routes
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};
```

### Data Validation
```javascript
// Input validation with Joi
const templateSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  category: Joi.string().valid('frontend', 'backend', 'fullstack').required(),
  difficulty: Joi.string().valid('beginner', 'intermediate', 'advanced').required()
});

// Sanitization
const sanitizeInput = (input) => {
  return DOMPurify.sanitize(input);
};
```

### Security Headers
```javascript
// Helmet.js configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true
  }
}));
```

## Deployment Architecture

### Frontend Deployment (Netlify/Vercel)
```yaml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Backend Deployment (Railway/Render)
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

### Database Deployment (MongoDB Atlas)
```javascript
// Connection configuration
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};
```

## Monitoring & Analytics

### Error Tracking (Sentry)
```javascript
// Frontend error boundary
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});
```

### Performance Monitoring
```javascript
// Custom performance metrics
const trackUserInteraction = (action, metadata) => {
  // Send to analytics service
  analytics.track(action, {
    ...metadata,
    timestamp: Date.now(),
    userId: user.id,
    sessionId: session.id
  });
};
```

### Health Checks
```javascript
// API health endpoint
app.get('/health', async (req, res) => {
  const health = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    services: {
      database: await checkDatabaseHealth(),
      redis: await checkRedisHealth(),
      external: await checkExternalServices()
    }
  };
  
  res.json(health);
});
```

## Scalability Considerations

### Horizontal Scaling
- **Load Balancing**: Multiple server instances
- **Database Sharding**: Distribute data across shards
- **CDN**: Global content distribution
- **Microservices**: Service decomposition for scale

### Caching Strategy
```javascript
// Multi-level caching
const getCachedTemplate = async (templateId) => {
  // 1. Check memory cache
  let template = memoryCache.get(templateId);
  if (template) return template;
  
  // 2. Check Redis cache
  template = await redisClient.get(`template:${templateId}`);
  if (template) {
    memoryCache.set(templateId, JSON.parse(template));
    return JSON.parse(template);
  }
  
  // 3. Query database
  template = await Template.findById(templateId);
  if (template) {
    await redisClient.setex(`template:${templateId}`, 3600, JSON.stringify(template));
    memoryCache.set(templateId, template);
  }
  
  return template;
};
```

This architecture provides a solid foundation for Code Compass, ensuring scalability, maintainability, and excellent user experience while following modern web development best practices.