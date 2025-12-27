# 📐 DEPLOYMENT ARCHITECTURE

## Overview

This document explains how the frontend (Vercel) communicates with the backend (Render).

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                         │
│                     (Any Device/Location)                   │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ HTTPS Request
                            │
        ┌───────────────────┴────────────────────┐
        │                                        │
        ▼                                        ▼
┌───────────────┐                       ┌───────────────┐
│  Static Files │                       │   API Calls   │
│  HTML/CSS/JS  │                       │   /api/*      │
└───────┬───────┘                       └───────┬───────┘
        │                                        │
        │ Served by Vercel CDN                  │
        │                                        │
┌───────▼──────────────────────────────────────┐│
│          VERCEL (Frontend Host)              ││
│      https://your-app.vercel.app             ││
│                                              ││
│  ┌──────────────────────────────────┐      ││
│  │   React App (SPA)                │      ││
│  │   - Routes (/, /about, etc.)     │      ││
│  │   - Components                   │      ││
│  │   - State Management             │      ││
│  │                                  │      ││
│  │   API Configuration:             │      ││
│  │   REACT_APP_BACKEND_URL          │      ││
│  │   = https://backend.onrender.com │      ││
│  └──────────────────────────────────┘      ││
│                                              ││
│  Features:                                   ││
│  • Free SSL/TLS                             ││
│  • Global CDN                               ││
│  • Auto-scaling                             ││
│  • SPA routing (vercel.json)                ││
└──────────────────────────────────────────────┘│
                                                │
                            API Requests        │
                            with CORS           │
                                                │
┌───────────────────────────────────────────────▼─────┐
│         RENDER (Backend Host)                       │
│      https://your-backend.onrender.com              │
│                                                      │
│  ┌──────────────────────────────────────┐          │
│  │   FastAPI Application                │          │
│  │   - Port: $PORT (auto-set by Render)│          │
│  │   - Host: 0.0.0.0                    │          │
│  │                                      │          │
│  │   API Routes:                        │          │
│  │   /           → Health check         │          │
│  │   /api/       → API endpoints        │          │
│  │   /api/auth/* → Authentication       │          │
│  │   /api/blogs/* → Blog endpoints      │          │
│  │   /api/contacts/* → Contact form     │          │
│  │   ... and more                       │          │
│  │                                      │          │
│  │   CORS Configuration:                │          │
│  │   CORS_ORIGINS=                      │          │
│  │     https://your-app.vercel.app      │          │
│  └─────────────┬────────────────────────┘          │
│                │                                     │
│  Features:     │                                     │
│  • Free SSL    │                                     │
│  • Auto-deploy │                                     │
│  • Health checks│                                    │
└────────────────┼─────────────────────────────────────┘
                 │
                 │ MongoDB Connection
                 │ MONGODB_URI
                 ▼
┌─────────────────────────────────┐
│     MongoDB Atlas (Database)    │
│   mongodb+srv://...mongodb.net  │
│                                 │
│  Collections:                   │
│  • users                        │
│  • services                     │
│  • projects                     │
│  • blogs                        │
│  • contacts                     │
│  • ... (22 total)               │
└─────────────────────────────────┘
```

---

## 🔄 Request Flow

### 1. Page Load Request

```
User enters URL
    ↓
https://your-app.vercel.app
    ↓
Vercel CDN serves index.html
    ↓
Browser downloads JS/CSS bundles
    ↓
React app initializes
    ↓
API configuration reads REACT_APP_BACKEND_URL
    ↓
API Base URL set to: https://backend.onrender.com/api
```

### 2. API Call Request

```
User action (e.g., load blog posts)
    ↓
Component calls: getBlogPosts()
    ↓
Service layer: blogService.js
    ↓
axios call via: api.get('/blogs/')
    ↓
Full URL constructed:
https://backend.onrender.com/api/blogs/
    ↓
CORS preflight check (OPTIONS)
    ↓
Backend verifies origin in CORS_ORIGINS
    ↓
Backend responds with data
    ↓
Frontend receives JSON
    ↓
Component updates UI
```

### 3. Authenticated API Call

```
Admin logs in
    ↓
POST /api/auth/login
    ↓
Backend returns JWT token
    ↓
Token stored in localStorage
    ↓
Subsequent requests include header:
Authorization: Bearer <token>
    ↓
Backend verifies JWT
    ↓
Returns protected data
```

---

## 🔐 Security Flow

### CORS (Cross-Origin Resource Sharing)

```
┌──────────────┐
│   Frontend   │  Origin: https://app.vercel.app
└──────┬───────┘
       │
       │ 1. OPTIONS /api/blogs/
       │    Origin: https://app.vercel.app
       │
       ▼
┌──────────────┐
│   Backend    │
│   CORS       │
│   Middleware │
└──────┬───────┘
       │
       │ 2. Check if origin in CORS_ORIGINS
       │    ✅ Match found
       │
       │ 3. Send headers:
       │    Access-Control-Allow-Origin: https://app.vercel.app
       │    Access-Control-Allow-Methods: GET, POST, PUT, DELETE
       │    Access-Control-Allow-Headers: Content-Type, Authorization
       │
       ▼
┌──────────────┐
│   Frontend   │  ✅ Request allowed, proceed
└──────────────┘
```

### JWT Authentication

```
┌──────────────┐
│   User       │
└──────┬───────┘
       │ 1. Login (username/password)
       ▼
┌──────────────┐
│   Backend    │
│   Auth       │
└──────┬───────┘
       │ 2. Verify credentials
       │ 3. Generate JWT token
       │    {user_id, role, exp: 7days}
       │
       ▼
┌──────────────┐
│   Frontend   │
│   localStorage│  4. Store token
└──────┬───────┘
       │
       │ 5. Include in all requests:
       │    Authorization: Bearer <token>
       │
       ▼
┌──────────────┐
│   Backend    │
│   JWT        │  6. Verify token signature
│   Middleware │  7. Check expiration
└──────┬───────┘  8. Extract user info
       │
       │ 9. Allow/Deny request
       ▼
┌──────────────┐
│   Response   │
└──────────────┘
```

---

## 🌐 Environment Configuration

### Local Development

```
┌──────────────────────────────────────┐
│  Developer Machine                   │
│                                      │
│  Frontend (localhost:3000)           │
│  REACT_APP_BACKEND_URL=/api          │
│       │                              │
│       │ Proxied by Kubernetes        │
│       ▼                              │
│  Backend (0.0.0.0:8001)              │
│  MongoDB (localhost:27017)           │
└──────────────────────────────────────┘
```

### Production Deployment

```
┌──────────────────────────────────────────┐
│  Vercel (Global CDN)                     │
│                                          │
│  Frontend                                │
│  REACT_APP_BACKEND_URL=                  │
│    https://backend.onrender.com          │
│       │                                  │
│       │ Direct HTTPS connection          │
│       ▼                                  │
├──────────────────────────────────────────┤
│  Render (Cloud Server)                   │
│                                          │
│  Backend                                 │
│  CORS_ORIGINS=                           │
│    https://app.vercel.app                │
│       │                                  │
│       │ Encrypted connection             │
│       ▼                                  │
├──────────────────────────────────────────┤
│  MongoDB Atlas (Cloud Database)          │
│                                          │
│  MONGODB_URI=                            │
│    mongodb+srv://...mongodb.net          │
└──────────────────────────────────────────┘
```

---

## 📊 Data Flow Examples

### Example 1: Blog Post Load

```
1. User visits: https://app.vercel.app/blogs

2. React Router: Loads <BlogList /> component

3. useEffect hook: Calls getBlogPosts()

4. API call:
   GET https://backend.onrender.com/api/blogs/
   
5. Backend:
   - Verifies CORS origin ✅
   - Queries MongoDB: db.blogs.find({published: true})
   - Returns JSON: [{id, title, content, ...}, ...]

6. Frontend:
   - Receives data
   - Updates state: setBlogPosts(data)
   - Re-renders UI with blog cards

7. User sees blog list
```

### Example 2: Contact Form Submit

```
1. User fills contact form at /contact

2. User clicks "Submit"

3. Form validation: Validates required fields

4. API call:
   POST https://backend.onrender.com/api/contacts/
   Body: {name, email, phone, service, message}

5. Backend:
   - Verifies CORS origin ✅
   - Validates data with Pydantic
   - Saves to MongoDB: contacts.insert_one(data)
   - Returns: {id, status: "success"}

6. Frontend:
   - Shows success toast
   - Clears form
   - (Optional) Sends email notification

7. Admin receives notification
```

### Example 3: Admin Login

```
1. Admin visits: https://app.vercel.app/admin/login

2. Enters credentials:
   username: admin
   password: admin123

3. API call:
   POST https://backend.onrender.com/api/auth/login
   Body: {username, password}

4. Backend:
   - Verifies CORS origin ✅
   - Hashes password: bcrypt.hash(password)
   - Compares with stored hash
   - Generates JWT token:
     jwt.encode({user_id, role: "admin", exp: 7days})
   - Returns: {token, user: {id, name, role}}

5. Frontend:
   - Stores token: localStorage.setItem('admin_token', token)
   - Stores user: localStorage.setItem('admin_user', JSON.stringify(user))
   - Redirects to: /admin/dashboard

6. All subsequent requests include:
   Header: Authorization: Bearer <token>

7. Admin can manage content
```

---

## 🚀 Deployment Process

### Frontend Deployment (Vercel)

```
1. Developer pushes code to GitHub
        ↓
2. Vercel detects push (webhook)
        ↓
3. Vercel clones repository
        ↓
4. Vercel installs dependencies
   $ yarn install
        ↓
5. Vercel injects environment variables
   REACT_APP_BACKEND_URL=https://backend.onrender.com
        ↓
6. Vercel builds application
   $ yarn build
        ↓
7. Vercel deploys to CDN
        ↓
8. Preview URL: https://app-git-branch.vercel.app
        ↓
9. Production URL: https://app.vercel.app
        ↓
10. Deployment complete (2-3 minutes)
```

### Backend Deployment (Render)

```
1. Developer pushes code to GitHub
        ↓
2. Render detects push (webhook)
        ↓
3. Render builds Docker image
        ↓
4. Render installs dependencies
   $ pip install -r requirements.txt
        ↓
5. Render sets environment variables
   MONGODB_URI, CORS_ORIGINS, SECRET_KEY, PORT
        ↓
6. Render starts application
   $ uvicorn server:app --host 0.0.0.0 --port $PORT
        ↓
7. Health check: GET /
   Expected: {"status": "healthy"}
        ↓
8. Backend live: https://backend.onrender.com
        ↓
9. Deployment complete (3-5 minutes)
```

---

## 🔧 Configuration Files

### Frontend (Vercel)

**vercel.json**
```json
{
  "rewrites": [
    {"source": "/(.*)", "destination": "/index.html"}
  ]
}
```
→ Enables SPA routing (all routes serve index.html)

**src/services/api.js**
```javascript
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const API_BASE_URL = backendUrl + '/api';
```
→ Configures API base URL from environment

### Backend (Render)

**server.py**
```python
PORT = int(os.environ.get("PORT", 8001))
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,  # From CORS_ORIGINS env var
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
→ Configures CORS and port from environment

**database.py**
```python
mongodb_uri = os.environ.get('MONGODB_URI')
client = MongoClient(mongodb_uri)
```
→ Connects to MongoDB from environment

---

## ✅ Success Checklist

- [x] **Frontend:** Deployed on Vercel with SSL ✅
- [x] **Backend:** Deployed on Render with SSL ✅
- [x] **Database:** MongoDB Atlas configured ✅
- [x] **CORS:** Backend allows Vercel origin ✅
- [x] **Environment:** Variables set correctly ✅
- [x] **API:** All endpoints accessible ✅
- [x] **Auth:** JWT authentication working ✅
- [x] **Routing:** SPA routing configured ✅

---

**Architecture Status:** Production Ready ✅  
**Last Updated:** December 2024
