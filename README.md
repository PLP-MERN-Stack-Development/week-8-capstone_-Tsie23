# Code Compass - MERN Stack Learning Platform

A comprehensive interactive learning tool for beginner coders to build full coding projects with guided structure and explanations.

## 🚀 Tech Stack

- **Frontend**: React.js + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Icons**: Lucide React

## 📋 Features

- **Interactive Project Builder**: Generate complete project structures with proper file organization
- **Step-by-Step Guidance**: Clear instructions with beginner-friendly explanations
- **Multiple Tech Stacks**: Support for MERN, Frontend, Firebase, and static site projects
- **Beginner/Intermediate Modes**: Personalized learning experience
- **User Authentication**: Secure login and user management
- **Progress Tracking**: Track completed projects and learning progress
- **Responsive Design**: Works on all devices

## 🛠️ Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd code-compass-mern
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cd server
   cp .env.example .env
   ```
   
   Edit the `.env` file with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/codecompass
   JWT_SECRET=your_secure_jwt_secret_here
   PORT=5000
   NODE_ENV=development
   ```

4. **Start MongoDB**
   - If using local MongoDB: `mongod`
   - If using MongoDB Atlas: Update the MONGODB_URI in .env

5. **Seed the database**
   ```bash
   cd server
   npm run seed
   ```

6. **Start the development servers**
   ```bash
   # From the root directory
   npm run dev:full
   ```

   This will start:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 🎯 Demo Credentials

After seeding the database, you can use these demo accounts:

**Beginner User:**
- Email: `demo@codecompass.com`
- Password: `demo123`

**Advanced User:**
- Email: `advanced@codecompass.com`
- Password: `advanced123`

## 📁 Project Structure

```
code-compass-mern/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   └── data/           # Static data
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Express backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   ├── scripts/            # Database scripts
│   └── package.json
├── README.md
└── package.json            # Root package.json
```

## 🔧 Available Scripts

### Root Directory
- `npm run dev` - Start frontend development server
- `npm run server` - Start backend development server
- `npm run dev:full` - Start both frontend and backend
- `npm run install:all` - Install dependencies for both client and server

### Server Directory
- `npm run dev` - Start backend with nodemon
- `npm start` - Start backend in production
- `npm run seed` - Seed database with sample data

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `GET /api/projects/featured/list` - Get featured projects

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/preferences` - Update user preferences
- `POST /api/users/complete-project` - Mark project as completed

## 🎨 UI Components

The application includes several reusable components:

- **Dashboard**: Main user interface with project selection
- **ProjectSelector**: Dropdown for choosing project types
- **FileStructure**: Interactive file tree visualization
- **CodeFlowPanel**: Step-by-step coding guidance
- **DependencyMap**: Visual dependency relationships
- **Glossary**: Searchable term definitions

## 🔐 Authentication Flow

1. User logs in with email/password
2. Server validates credentials and returns JWT token
3. Token is stored in localStorage
4. Token is included in API requests via Authorization header
5. Server validates token on protected routes

## 📊 Database Schema

### User Model
- Personal information (name, username, email)
- Authentication (hashed password)
- Preferences (theme, mode, selected project)
- Progress tracking (completed projects)

### Project Model
- Project metadata (name, description, tech stack)
- File structure (hierarchical file organization)
- Code flow (step-by-step instructions)
- Dependencies and setup instructions

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting service

### Backend (Heroku/Railway/DigitalOcean)
1. Set environment variables on your hosting platform
2. Deploy the `server` directory
3. Ensure MongoDB is accessible from your hosting environment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Contact the development team

## 🎯 Roadmap

- [ ] Add more project templates
- [ ] Implement real-time collaboration
- [ ] Add video tutorials
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Integration with popular IDEs

---

Built with ❤️ for the coding community