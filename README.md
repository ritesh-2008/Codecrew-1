# CodeCrew Backend API

A community-based project collaboration platform backend built with Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication** — Register, login with JWT tokens
- **Password Security** — Bcrypt hashing, salted passwords
- **Project Management** — Create, view, and join projects
- **Rate Limiting** — Protection against brute-force attacks
- **CORS & Security Headers** — Helmet.js for security
- **Input Validation** — express-validator for data sanitization
- **MongoDB Integration** — Mongoose ODM for database

## 📋 Prerequisites

- **Node.js** 16+ (check with `node -v`)
- **MongoDB** running locally on `localhost:27017`
- **npm** (comes with Node.js)

## 🔧 Installation

### 1. Clone and install dependencies
```bash
git clone <repo-url>
cd CodeCrew
npm install
```

### 2. Create `.env` file in backend directory
```bash
cp backend/.env.example backend/.env  # if example exists, otherwise create manually
```

### 3. Configure `.env`
Edit `backend/.env` with your settings:
```properties
PORT=3001
HOST=127.0.0.1
MONGODB_URI=mongodb://localhost:27017/codecrew
NODE_ENV=development
JWT_SECRET=your_strong_secret_key_here_at_least_32_chars
JWT_EXPIRATION=1d
CORS_ORIGIN=http://localhost:3000
```

### 4. Start MongoDB (if not running)
```bash
# On Linux/macOS with MongoDB installed
mongod

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

## ▶️ Running the Server

### Development mode (with auto-reload via nodemon)
```bash
npm run dev
```

### Production mode
```bash
npm start
```

Server runs on: **http://127.0.0.1:3001**

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login and get JWT token |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/createprojects` | Create new project (authenticated) |
| `GET` | `/api/getprojects` | List all projects (authenticated) |
| `GET` | `/api/projects/:id` | Get project by ID (authenticated) |
| `POST` | `/api/projects/:id/join` | Join a project (authenticated) |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users/user/:id` | Get user by ID (authenticated) |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Check server status |

## 📝 Request/Response Examples

### 1. Register User
**Request:**
```bash
curl -X POST http://127.0.0.1:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alice",
    "email": "alice@example.com",
    "password": "securePass123",
    "skills": ["react", "nodejs", "mongodb"]
  }'
```

**Response (200):**
```json
{
  "success": true,
  "message": "User registered successfully"
}
```

### 2. Login User
**Request:**
```bash
curl -X POST http://127.0.0.1:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "securePass123"
  }'
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Get Projects (Authenticated)
**Request:**
```bash
curl -X GET http://127.0.0.1:3001/api/getprojects \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200):**
```json
{
  "success": true,
  "projects": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "React Dashboard",
      "description": "A modern dashboard application",
      "skills": ["react", "nodejs"],
      "location": {
        "city": "Bangalore",
        "lat": 12.9716,
        "lng": 77.5946
      }
    }
  ]
}
```

### 4. Create Project (Authenticated)
**Request:**
```bash
curl -X POST http://127.0.0.1:3001/api/createprojects \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mobile App",
    "description": "Cross-platform mobile application",
    "skills": ["react-native", "firebase"],
    "location": {
      "city": "Pune",
      "lat": 18.5204,
      "lng": 73.8567
    }
  }'
```

## 🔐 Security Features

### Password Hashing
- Passwords are hashed with **bcrypt** (10 salt rounds)
- Never stored or transmitted in plain text

### JWT Authentication
- **Token expiration:** 1 day (configurable)
- **Bearer token format:** `Authorization: Bearer <token>`
- Tokens verified on every protected request

### Rate Limiting
- **Login endpoint:** 5 attempts per 15 minutes per IP
- **General API:** 100 requests per minute per IP

### Input Validation
- Email format validation
- Password minimum 6 characters
- Username 3-30 characters
- Array validation for skills

### Security Headers
- **Helmet.js** provides HTTP security headers
- **CORS** restricted to configured origin (default: `http://localhost:3000`)

## 🗄️ Database Schema

### User
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  skills: [String],
  location: {
    city: String,
    lat: Number,
    lng: Number
  },
  createdAt: Date
}
```

### Project
```javascript
{
  title: String (required),
  description: String (required),
  skills: [String],
  location: {
    city: String,
    lat: Number,
    lng: Number
  },
  members: [ObjectId],
  createdAt: Date
}
```

## 🧪 Testing with Postman/Insomnia

1. **Register** — POST `/api/auth/register`
2. **Login** — POST `/api/auth/login` → Get token
3. **Use Token** — Add header `Authorization: Bearer <token>` to protected requests
4. **Test Protected Routes** — GET `/api/getprojects` with token

## 📚 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3001 | Server port |
| `HOST` | 127.0.0.1 | Server host |
| `MONGODB_URI` | mongodb://localhost:27017/codecrew | MongoDB connection URI |
| `NODE_ENV` | development | Environment (development/production) |
| `JWT_SECRET` | - | Secret key for signing JWT tokens (required) |
| `JWT_EXPIRATION` | 1d | Token expiration time |
| `CORS_ORIGIN` | http://localhost:3000 | Allowed CORS origin |

## 🚨 Common Errors

### "Server configuration error" during login
**Solution:** Check that `JWT_SECRET` is set in `.env` (no spaces around `=`)

### "Cannot find module" errors
**Solution:** Run `npm install` to install all dependencies

### MongoDB connection errors
**Solution:** Ensure MongoDB is running on `localhost:27017`

### CORS errors on frontend
**Solution:** Update `CORS_ORIGIN` in `.env` to match your frontend URL

## 📦 Dependencies

- **express** — Web framework
- **mongoose** — MongoDB ODM
- **bcrypt** — Password hashing
- **jsonwebtoken** — JWT authentication
- **cors** — CORS middleware
- **helmet** — Security headers
- **express-rate-limit** — Rate limiting
- **express-validator** — Input validation
- **dotenv** — Environment variables

## 🛠️ Development Dependencies

- **nodemon** — Auto-reload on file changes

## 📖 Next Steps (Frontend Integration)

1. Install your frontend framework (React, Vue, etc.)
2. Point API calls to `http://127.0.0.1:3001/api`
3. Store JWT token in localStorage/sessionStorage after login
4. Include token in `Authorization: Bearer <token>` header for protected requests
5. Handle token expiration and redirect to login if needed

## 📝 Notes

- `.env` file should never be committed to Git (already in `.gitignore`)
- Always use HTTPS in production
- Rotate `JWT_SECRET` periodically in production
- Monitor rate limits and adjust if needed

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

ISC

---

**Ready for frontend?** Backend is production-ready! Build your frontend with confidence. 🚀
