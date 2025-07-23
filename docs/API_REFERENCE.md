# API Reference

## Authentication Endpoints

### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "mode": "beginner"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "mode": "beginner"
    },
    "token": "jwt_token"
  }
}
```

### POST /api/auth/login
Authenticate user and return JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "mode": "beginner"
    },
    "token": "jwt_token"
  }
}
```

## Template Endpoints

### GET /api/templates
Get all available project templates.

**Query Parameters:**
- `category` (optional): Filter by category
- `difficulty` (optional): Filter by difficulty level

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "mern-stack",
      "name": "MERN Stack Project",
      "description": "Full-stack web application with MongoDB, Express.js, React, and Node.js",
      "category": "fullstack",
      "difficulty": "intermediate",
      "fileStructure": [...],
      "dependencies": [...],
      "codeFlow": [...]
    }
  ]
}
```

### GET /api/templates/:id
Get a specific project template by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "mern-stack",
    "name": "MERN Stack Project",
    "description": "Full-stack web application with MongoDB, Express.js, React, and Node.js",
    "category": "fullstack",
    "difficulty": "intermediate",
    "fileStructure": [
      {
        "id": "root",
        "name": "my-mern-app",
        "type": "folder",
        "path": "/",
        "order": 1,
        "description": "Root project directory",
        "tool": "File System",
        "children": [...]
      }
    ],
    "dependencies": [
      {
        "from": "/client/src/index.js",
        "to": "/client/src/App.js",
        "type": "import",
        "description": "Main entry point imports the App component"
      }
    ],
    "codeFlow": [
      {
        "id": "step-1",
        "title": "Project Setup",
        "description": "Initialize both client and server directories with package.json files",
        "files": ["/client/package.json", "/server/package.json"],
        "order": 1
      }
    ]
  }
}
```

## User Progress Endpoints

### GET /api/users/progress
Get user's learning progress.

**Headers:**
```
Authorization: Bearer jwt_token
```

**Response:**
```json
{
  "success": true,
  "data": {
    "progress": [
      {
        "templateId": "mern-stack",
        "completedSteps": ["step-1", "step-2"],
        "lastAccessedAt": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

### PUT /api/users/progress
Update user's learning progress.

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "templateId": "mern-stack",
  "completedSteps": ["step-1", "step-2", "step-3"],
  "lastAccessedAt": "2024-01-15T11:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Progress updated successfully"
}
```

## Glossary Endpoints

### GET /api/glossary
Get all glossary terms.

**Query Parameters:**
- `category` (optional): Filter by category
- `search` (optional): Search terms by name or definition

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "api",
      "term": "API",
      "definition": "Application Programming Interface - a set of protocols and tools for building software applications",
      "category": "Backend",
      "examples": ["REST API", "GraphQL API"],
      "relatedTerms": ["REST", "endpoint", "HTTP"]
    }
  ]
}
```

### GET /api/glossary/search
Search glossary terms.

**Query Parameters:**
- `q` (required): Search query

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "api",
      "term": "API",
      "definition": "Application Programming Interface...",
      "category": "Backend",
      "examples": ["REST API", "GraphQL API"],
      "relatedTerms": ["REST", "endpoint", "HTTP"]
    }
  ]
}
```

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR`: Request validation failed
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `INTERNAL_ERROR`: Server error

## Rate Limiting

API endpoints are rate limited to prevent abuse:
- **Authentication endpoints**: 5 requests per minute per IP
- **Template endpoints**: 100 requests per minute per user
- **User endpoints**: 50 requests per minute per user
- **Glossary endpoints**: 200 requests per minute per user

## WebSocket Events

### Connection
```javascript
const socket = io('ws://localhost:5000');

socket.on('connect', () => {
  console.log('Connected to server');
});
```

### User Progress Updates
```javascript
// Listen for progress updates
socket.on('progress:updated', (data) => {
  console.log('Progress updated:', data);
});

// Send progress update
socket.emit('progress:update', {
  templateId: 'mern-stack',
  stepId: 'step-1',
  completed: true
});
```

### Real-time Notifications
```javascript
// Listen for notifications
socket.on('notification', (data) => {
  console.log('New notification:', data);
});
```