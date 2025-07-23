# Code Compass - Interactive Learning Tool

## 🎯 Project Overview

Code Compass is a comprehensive React-based web application designed to help beginner and self-taught coders learn how to structure full coding projects. The platform provides interactive file structure visualization, dependency mapping, and step-by-step guidance for building real-world applications.

### Real-World Problem Solved
Many beginner developers struggle with understanding how to organize and structure complete projects. They often know individual concepts but lack the knowledge of how files connect, what order to create them in, and how dependencies work in real applications. Code Compass bridges this gap by providing visual, interactive learning experiences.

## 🏗️ Technical Architecture

### Frontend Architecture
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for responsive, utility-first styling
- **React Router** for client-side routing
- **Context API** for state management (Theme, User)
- **Framer Motion** for smooth animations

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
│   ├── auth/               # Authentication components
│   │   └── AuthModal.tsx
│   └── home/               # Homepage components
│       └── Hero.tsx
├── contexts/               # React Context providers
│   ├── ThemeContext.tsx
│   └── UserContext.tsx
├── pages/                  # Page components
│   ├── Home.tsx
│   ├── Dashboard.tsx
│   ├── Projects.tsx
│   ├── Glossary.tsx
│   └── Templates.tsx
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
- **Local Storage**: Progress persistence and user preferences
- **URL State**: Router state for navigation

## 🚀 Features

### Core Functionality
- ✅ Interactive homepage with hero section
- ✅ Light/Dark mode toggle with light mode as default
- ✅ Mobile-friendly responsive UI with working hamburger menu
- ✅ User authentication system (sign up/sign in)
- ✅ Progress tracking with visual indicators
- ✅ Dashboard with project guides and glossary
- ✅ Project type selector with auto-generated structures
- ✅ Visual file/folder structure in creation order
- ✅ File dependency mapping
- ✅ Interactive tooltips with boilerplate code
- ✅ Step-by-step code flow explanations
- ✅ Beginner/Intermediate mode toggle
- ✅ Comprehensive programming glossary
- ✅ Modal system for demos and file details

### User Experience Features
- ✅ **Progress Tracking**: Users can check off completed files
- ✅ **Visual Progress Indicators**: Green backgrounds and checkmarks
- ✅ **Personalized Dashboard**: Welcome messages based on user state
- ✅ **Learning Mode Selection**: Beginner vs Intermediate explanations
- ✅ **Persistent Sessions**: User data saved locally
- ✅ **Mobile Authentication**: Responsive sign in/up forms

### Supported Project Templates
- ✅ MERN Stack project
- ✅ Frontend website (HTML/CSS/JS)
- 🔄 Firebase project (coming soon)
- 🔄 Static Tailwind site (coming soon)
- 🔄 Fullstack web app variations (coming soon)
- 🔄 Software testing & debugging (coming soon)
- 🔄 Mobile app development (Flutter) (coming soon)

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

### Components
- Reusable Button component with variants
- Modal system for overlays and authentication
- Tooltip system for contextual help
- Select dropdown with custom styling
- Responsive navigation with functional mobile menu

## 🔐 Authentication System

### User Management
- **Sign Up**: Create new accounts with name, email, password
- **Sign In**: Authenticate existing users
- **Learning Mode**: Choose between beginner/intermediate during signup
- **Progress Tracking**: Persistent progress across sessions
- **User Profiles**: Display user info in navbar
- **Session Management**: Proper sign in/out flow

### Data Structure
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  mode: 'beginner' | 'intermediate';
  progress: UserProgress[];
}

interface UserProgress {
  templateId: string;
  completedSteps: string[];
  lastAccessedAt: Date;
}
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
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

# Start development server
npm run dev
```

### Environment Variables
```env
# Frontend (.env)
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 📚 Project Roadmap

### Phase 1: Foundation (✅ Completed)
- ✅ Project setup and architecture
- ✅ Core UI components and design system
- ✅ Basic project templates
- ✅ File structure visualization
- ✅ Responsive design implementation
- ✅ User authentication system
- ✅ Progress tracking functionality

### Phase 2: Backend Integration (📋 Planned)
- 📋 MongoDB setup and schemas
- 📋 Express.js API development
- 📋 JWT authentication
- 📋 Template management system
- 📋 Real-time progress sync

### Phase 3: Advanced Features (📋 Planned)
- 📋 Real-time collaboration
- 📋 Advanced project templates
- 📋 Code generation features
- 📋 Integration with development tools
- 📋 Community features

### Phase 4: Production & Scale (📋 Planned)
- 📋 Performance optimization
- 📋 Advanced analytics
- 📋 Mobile app development
- 📋 Enterprise features
- 📋 API for third-party integrations

## 🚀 Deployment

### Live Application
The application is deployed and accessible at: [https://astonishing-tulumba-084564.netlify.app](https://astonishing-tulumba-084564.netlify.app)

### Deployment Platform
- **Frontend**: Netlify
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Write tests for new features
- Ensure responsive design
- Follow accessibility guidelines
- Test authentication flows
- Verify progress tracking functionality

### Getting Started
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (especially auth and mobile)
5. Submit a pull request

## 📊 Current Status

### ✅ Completed Features
- Full responsive design with working mobile menu
- Complete authentication system
- Progress tracking with visual indicators
- Light mode as default theme
- Interactive file structure visualization
- Comprehensive project templates
- Programming glossary
- User profile management

### 🔄 In Progress
- Backend API development
- Database integration
- Real-time features

### 📋 Upcoming
- Additional project templates
- Advanced progress analytics
- Community features
- Mobile app

## 🧪 Testing

### Manual Testing Checklist
- ✅ Responsive design across devices
- ✅ Authentication flows (sign up/in/out)
- ✅ Progress tracking functionality
- ✅ Theme switching
- ✅ Mobile hamburger menu
- ✅ File structure interactions
- ✅ Modal systems

### Automated Testing (Planned)
- Unit tests for components
- Integration tests for auth flows
- E2E tests for user journeys
- Accessibility testing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React and Vite teams for excellent development tools
- Tailwind CSS for the utility-first CSS framework
- Lucide React for beautiful icons
- The open-source community for inspiration and resources

---

**Code Compass** - Helping developers navigate their coding journey, one project at a time. 🧭

*Built with ❤️ for the developer community*