# 🚀 CodeCrew - Developer Collaboration Platform

**Connect. Collaborate. Build. Grow.**

CodeCrew is a modern web platform that brings developers together to collaborate on exciting projects. Share your ideas, find like-minded collaborators, and build amazing things as a community.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss)
![Status](https://img.shields.io/badge/Status-Active%20Development-yellow)

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Frontend Pages](#-frontend-pages)
- [Authentication](#-authentication)
- [Usage Guide](#-usage-guide)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔐 **Authentication & Security**
- Secure user registration and login with JWT tokens
- Password hashing with bcrypt (10+ salt rounds)
- Protected routes with authentication middleware
- Rate limiting to prevent brute-force attacks
- CORS security with helmet.js

### 👥 **User Management**
- User registration with email and password
- User profiles with skills and location
- Public user information for collaboration discovery

### 💡 **Project Management**
- Create and publish projects to the community
- Add project descriptions, required skills, and location
- Browse all available projects in a beautiful feed
- Join projects you're interested in
- View project creator information

### 🎨 **Modern UI/UX**
- Beautiful glass-morphism design with gradients
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Intuitive navigation
- Premium visual experience

### 🔒 **Data Protection**
- Input validation and sanitization
- MongoDB with Mongoose ODM
- Environment-based configuration
- Error handling and logging

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **State Management**: React Context API & Hooks
- **Authentication**: JWT with jwt-decode

### **Backend**
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Security**: bcryptjs
- **Validation**: express-validator
- **Security**: helmet, cors, express-rate-limit
- **Environment**: dotenv

### **Tools & Libraries**
- Package Manager: npm
- Build Tool: Vite
- CSS Framework: Tailwind CSS
- Database: MongoDB (Local/Atlas)

---

## 📁 Project Structure

```
CodeCrew/
├── frontend/
│   └── codecrew-frontend/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Createproject.jsx    # Project creation form
│       │   │   ├── Protectedroute.jsx   # Route protection wrapper
│       │   │   └── ...
│       │   ├── context/
│       │   │   └── Authcontext.jsx      # Global auth state
│       │   ├── hooks/
│       │   │   └── usehook.jsx          # Custom auth hook
│       │   ├── pages/
│       │   │   ├── Landing.jsx          # Landing page
│       │   │   ├── Login.jsx            # Login page
│       │   │   ├── Regester.jsx         # Registration page
│       │   │   └── Feed.jsx             # Projects feed
│       │   ├── api/
│       │   │   └── axios.js             # Axios configuration
│       │   ├── App.jsx                  # Main app component
│       │   └── index.css                # Global styles
│       ├── package.json
│       ├── tailwind.config.js
│       └── vite.config.js
│
├── backend/
│   ├── config/
│   │   └── db.js                        # MongoDB connection
│   ├── middleware/
│   │   └── auth.js                      # JWT verification
│   ├── controllers/
│   │   ├── auth.controller.js           # Auth logic
│   │   └── project.controller.js        # Project logic
│   ├── models/
│   │   ├── user.js                      # User schema
│   │   └── project.js                   # Project schema
│   ├── routes/
│   │   ├── auth.router.js               # Auth routes
│   │   └── project.router.js            # Project routes
│   ├── server.js                        # Express server
│   ├── .env                             # Environment variables
│   └── package.json
│
├── package.json                         # Root package.json
└── README.md                            # This file
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **npm** v7 or higher (comes with Node.js)
- **MongoDB** running locally or MongoDB Atlas account
- **Git** for version control
- A code editor (VS Code recommended)

**Check your versions:**
```bash
node -v      # Should be 16+
npm -v       # Should be 7+
```

---

## 🔧 Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/ritesh-2008/Codecrew-1.git
cd CodeCrew
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd ../frontend/codecrew-frontend
npm install
```

### Step 4: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is running on localhost:27017
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string
- Update `.env` with your connection string

---

## ⚙️ Configuration

### Backend Environment Setup

Create `backend/.env` file:

```env
# Server Configuration
PORT=3000
NODE_ENV=development
HOST=localhost

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/codecrew
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codecrew

# JWT Configuration
JWT_SECRET=your_super_secret_key_here_at_least_32_characters_long_for_security
JWT_EXPIRATION=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5175
```

### Frontend Environment Setup

Create `frontend/codecrew-frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## 🚀 Running the Application

### Start Backend Server (Terminal 1)
```bash
cd backend
npm run dev
```
✅ Backend runs on: `http://localhost:3000`

### Start Frontend Dev Server (Terminal 2)
```bash
cd frontend/codecrew-frontend
npm run dev
```
✅ Frontend runs on: `http://localhost:5175`

### Open in Browser
Navigate to: **http://localhost:5175** 🎉

---

## 🔌 API Endpoints

### **Authentication Routes** (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | User login | ❌ |
| POST | `/logout` | User logout | ✅ |
| GET | `/me` | Get current user | ✅ |

**Register Payload:**
```json
{
  "username": "john_dev",
  "email": "john@example.com",
  "password": "SecurePass123",
  "skills": ["React", "Node.js"],
  "location": "San Francisco"
}
```

**Login Payload:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

### **Project Routes** (`/api/projects`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/createprojects` | Create new project | ✅ |
| GET | `/getprojects` | Get all projects | ✅ |
| GET | `/:id` | Get project details | ✅ |
| POST | `/:id/join` | Join a project | ✅ |
| PUT | `/:id` | Update project | ✅ |
| DELETE | `/:id` | Delete project | ✅ |

**Create Project Payload:**
```json
{
  "title": "AI Chat Application",
  "description": "A modern chat app using OpenAI API and React",
  "skills": ["React", "Node.js", "OpenAI"],
  "location": "Remote"
}
```

### **Response Format**

Success Response:
```json
{
  "success": true,
  "data": { /* data object */ },
  "message": "Operation successful"
}
```

Error Response:
```json
{
  "success": false,
  "error": "ValidationError",
  "message": "Email already registered"
}
```

---

## 🎨 Frontend Pages

### **Landing Page** (`/`)
- 🎯 Hero section with platform introduction
- ✨ Feature highlights (Share Ideas, Collaborate, Grow Skills)
- 📊 Community statistics
- 🔘 Call-to-action buttons (Login/Register)
- 📱 Fully responsive design

### **Login Page** (`/login`)
- 🔐 Secure email and password authentication
- 👁️ Password visibility toggle
- ✉️ Email validation feedback
- 🔗 Link to registration
- 🎨 Modern glass-morphism design

### **Register Page** (`/register`)
- 👤 User registration form
- 📝 Fields: Username, Email, Password, Skills, Location
- ✅ Password strength validation
- 🎨 Responsive form layout
- 🔗 Link to login

### **Feed Page** (`/feed`) 🔒
- 🔍 Browse all available projects
- 🎴 Project cards with descriptions and skills
- ➕ Create project button
- 🚀 Join project functionality
- 👨‍💻 Creator information display
- 💡 Responsive grid layout

### **Create Project** (`/createproject`) 🔒
- 📋 Project creation form
- 📝 Fields: Title, Description, Skills, Location
- 📊 Character counter for description
- ✨ Success/Error feedback
- 🎨 Modern UI with validation

---

## 🔐 Authentication

### JWT Token Flow

```
1. User Registration/Login
         ↓
2. Password Verified (bcrypt)
         ↓
3. JWT Token Generated
         ↓
4. Token Stored in localStorage
         ↓
5. Token Sent with Every Request
         ↓
6. Token Verified on Backend
         ↓
7. Request Processed
```

### Token Storage
- 📦 Stored in browser **localStorage**
- 🔗 Attached to all API requests via **Authorization header**
- 🗑️ Automatically cleared on **logout**

### Protected Routes
- `/feed` - Browse projects
- `/createproject` - Create new projects
- All project actions - Require authentication

### Token Expiration
- Default: **7 days**
- Configurable via `JWT_EXPIRATION` in `.env`
- User redirected to login on expiration

---

## 📖 Usage Guide

### 1️⃣ **Sign Up**
   ```
   1. Click "Create Account" on landing page
   2. Enter username, email, password
   3. Optional: Add skills and location
   4. Click "Create Account"
   5. Auto-redirects to Feed page
   ```

### 2️⃣ **Log In**
   ```
   1. Click "Already a member?" or go to /login
   2. Enter email and password
   3. Click "Sign In"
   4. Redirects to Feed page
   ```

### 3️⃣ **Browse Projects**
   ```
   1. You're automatically on Feed after login
   2. Scroll through available projects
   3. See project details, skills, and creator info
   4. Filter or search for specific projects
   ```

### 4️⃣ **Create a Project**
   ```
   1. Click "Create Project ➕" button
   2. Fill in project title
   3. Add detailed description
   4. Add required skills (comma-separated)
   5. Optional: Add location
   6. Click "Create Project 🚀"
   ```

### 5️⃣ **Join a Project**
   ```
   1. Find a project you're interested in
   2. Click "Join Crew 🚀" button
   3. Success message appears
   4. You're now part of the project crew!
   ```

---

## 🎯 Key Features Explained

### Glass-Morphism Design
Modern UI with:
- 🔹 Frosted glass effect (`bg-white/80 backdrop-blur-sm`)
- 🌈 Gradient accents (rose-500 to pink-600)
- ✨ Smooth animations and transitions
- 💫 Hover effects and interactive elements

### Responsive Design
```
📱 Mobile (< 640px)
   ├─ Single column layout
   ├─ Smaller fonts and buttons
   └─ Touch-friendly interactions

📱 Tablet (640px - 1024px)
   ├─ Two column grids
   ├─ Medium-sized typography
   └─ Optimized spacing

🖥️ Desktop (> 1024px)
   ├─ Multi-column layouts
   ├─ Large typography
   └─ Full featured experience
```

### Input Validation
- ✉️ Email format validation
- 🔒 Password strength (min 6 characters)
- 📝 Project title required
- 📄 Description minimum 20 characters
- 💡 Skills comma-separated parsing

### Error Handling
- 🎯 User-friendly error messages
- 🎨 Animated error displays
- 🔄 Automatic error clearing
- 📋 Detailed console logging

---

## 📦 Dependencies

### Frontend
```json
{
  "react": "^19.0.0",
  "react-router-dom": "^7.0.0",
  "axios": "^1.x.x",
  "jwt-decode": "^4.x.x"
}
```

### Backend
```json
{
  "express": "^4.x.x",
  "mongoose": "^7.x.x",
  "bcryptjs": "^2.x.x",
  "jsonwebtoken": "^9.x.x",
  "express-validator": "^7.x.x",
  "helmet": "^7.x.x",
  "express-rate-limit": "^6.x.x",
  "cors": "^2.x.x",
  "dotenv": "^16.x.x"
}
```

---

## 🚧 Future Enhancements

- [ ] User profile pages with portfolio
- [ ] Project messaging and real-time chat
- [ ] Skills matching algorithm
- [ ] Project progress tracking
- [ ] User ratings and reviews
- [ ] Email notifications
- [ ] OAuth2 authentication (GitHub, Google)
- [ ] Dark mode toggle
- [ ] Advanced project filtering and search
- [ ] User dashboard and analytics

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 💬 Support & Contact

- **Issues**: Open an issue on GitHub
- **Questions**: Discuss in GitHub Discussions

---

## 🙏 Acknowledgments

- React team for an amazing framework
- MongoDB for reliable database
- Tailwind CSS for utility-first styling
- Express community for great middleware

---

**Made with ❤️ by the CodeCrew team**

*Last updated: June 2026*
