# Deployment Guide

## Local Development Setup

1. **Install Dependencies**
   ```bash
   npm run install:all
   ```

2. **Environment Setup**
   ```bash
   # Copy environment files
   cp .env.example .env
   cp server/.env.example server/.env
   ```

3. **Configure MongoDB**
   - Install MongoDB locally OR use MongoDB Atlas
   - Update `MONGODB_URI` in `server/.env`

4. **Start Development Servers**
   ```bash
   npm run dev:full
   ```

## Production Deployment

### Frontend (Netlify/Vercel)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your Git repository
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Deploy to Vercel**
   - Connect your Git repository
   - Build command: `npm run build`
   - Output directory: `dist`

### Backend (Railway/Heroku/DigitalOcean)

1. **Deploy server directory**
   - Upload the `server` folder
   - Set environment variables
   - Install command: `npm install`
   - Start command: `npm start`

2. **Environment Variables**
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_jwt_secret
   PORT=5000
   NODE_ENV=production
   ```

## Database Setup

### MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address
5. Get connection string and update `MONGODB_URI`

### Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/codecompass`

## Seeding Data

```bash
cd server
npm run seed
```

Demo credentials:
- Email: demo@codecompass.com
- Password: demo123