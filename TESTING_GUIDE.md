# Testing Guide - New Features & Deployment

## 🎯 New Features Added

### 1. **Admin Dashboard** (`/api/admin/*`)
- **Dashboard Statistics**: View total tasks, completion rates, user counts
- **User Management**: View all users, get user details, delete users
- **Activity Logs**: Track system activities (logins, task creation, etc.)

### 2. **Enhanced Security**
- **Rate Limiting**: 100 requests per 15 minutes (5 for auth endpoints)
- **CORS Configuration**: Configurable allowed origins
- **Input Validation**: All endpoints validate input data
- **Request Logging**: All requests logged with timestamps
- **Enhanced Error Handling**: Proper error responses

### 3. **Task Categories & Tags**
- **Categories**: Learning, Development, Design, Testing, Deployment, Documentation
- **Priorities**: low, medium, high, urgent
- **Tags**: Add multiple tags to tasks for better organization
- **Filtering**: Filter tasks by category, priority, or tags

### 4. **Task Statistics & Reporting**
- **Overview Stats**: Total, completed, pending tasks
- **Category Breakdown**: Tasks per category
- **Priority Breakdown**: Tasks per priority level

---

## 🧪 Testing Locally

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Update .env File
Create or update `.env` file:
```
PORT=3000
NODE_ENV=development
JWT_SECRET=your-secret-key-here
ALLOWED_ORIGINS=*
```

### Step 3: Start Server
```bash
npm start
# or for development with auto-reload
npm run dev
```

Server will start on `http://localhost:3000`

---

## 📡 Testing New Endpoints

### **Authentication Endpoints**

#### 1. Register New User
```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully"
}
```

#### 2. Login (Get Token)
```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  }
}
```

**Copy the token for authenticated requests!**

---

### **Task Endpoints**

#### 3. Get All Tasks (with filters)
```bash
GET http://localhost:3000/api/tasks
GET http://localhost:3000/api/tasks?category=Development
GET http://localhost:3000/api/tasks?priority=high
GET http://localhost:3000/api/tasks?tag=api
```

#### 4. Create Task with Category, Priority, Tags
```bash
POST http://localhost:3000/api/tasks
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Build REST API",
  "category": "Development",
  "priority": "high",
  "tags": ["api", "express", "backend"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "title": "Build REST API",
    "completed": false,
    "userId": 1,
    "category": "Development",
    "priority": "high",
    "tags": ["api", "express", "backend"],
    "createdAt": "2026-05-19T08:00:00.000Z",
    "updatedAt": "2026-05-19T08:00:00.000Z"
  },
  "message": "Task created successfully"
}
```

#### 5. Update Task
```bash
PUT http://localhost:3000/api/tasks/3
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Build REST API with Express",
  "completed": true,
  "priority": "urgent"
}
```

#### 6. Get Task Statistics
```bash
GET http://localhost:3000/api/tasks/stats/overview
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 3,
    "completed": 1,
    "pending": 2,
    "byCategory": {
      "Learning": 1,
      "Development": 1,
      "Design": 0,
      "Testing": 0,
      "Deployment": 0,
      "Documentation": 0
    },
    "byPriority": {
      "low": 0,
      "medium": 1,
      "high": 1,
      "urgent": 1
    }
  }
}
```

#### 7. Get Available Categories
```bash
GET http://localhost:3000/api/tasks/meta/categories
```

**Response:**
```json
{
  "success": true,
  "data": ["Learning", "Development", "Design", "Testing", "Deployment", "Documentation"]
}
```

#### 8. Get Available Priorities
```bash
GET http://localhost:3000/api/tasks/meta/priorities
```

**Response:**
```json
{
  "success": true,
  "data": ["low", "medium", "high", "urgent"]
}
```

---

### **Admin Dashboard Endpoints** (Admin Only)

#### 9. Get Dashboard Statistics
```bash
GET http://localhost:3000/api/admin/dashboard
Authorization: Bearer ADMIN_TOKEN_HERE
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalTasks": 3,
    "completedTasks": 1,
    "pendingTasks": 2,
    "completionRate": "33.33",
    "totalUsers": 3,
    "activeUsers": 2
  }
}
```

#### 10. Get All Users
```bash
GET http://localhost:3000/api/admin/users
Authorization: Bearer ADMIN_TOKEN_HERE
```

#### 11. Get Activity Logs
```bash
GET http://localhost:3000/api/admin/activity-logs
Authorization: Bearer ADMIN_TOKEN_HERE
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "action": "user_login",
      "userId": 1,
      "timestamp": "2026-05-19T06:00:00Z"
    },
    {
      "id": 2,
      "action": "task_created",
      "userId": 2,
      "timestamp": "2026-05-19T06:30:00Z"
    }
  ]
}
```

---

## 🔒 Security Testing

### Test Rate Limiting
Send more than 100 requests in 15 minutes:
```bash
# You'll receive:
{
  "success": false,
  "error": "Too many requests from this IP, please try again later."
}
```

### Test Input Validation
Send invalid data:
```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "username": "ab",  # Too short
  "password": "123"   # Too short
}
```

**Response:**
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Username must be 3-20 characters",
      "param": "username"
    },
    {
      "msg": "Password must be at least 8 characters",
      "param": "password"
    }
  ]
}
```

### Test Authentication
Try to access protected endpoint without token:
```bash
POST http://localhost:3000/api/tasks
Content-Type: application/json

{
  "title": "Test"
}
```

**Response:**
```json
{
  "success": false,
  "error": "No token provided"
}
```

---

## 🚀 Testing Deployment

### Step 1: Push to GitHub
```bash
git push origin main
```

### Step 2: Deploy to Render

#### Option A: Using render.yaml (Automatic)
1. Go to [render.com](https://render.com)
2. Connect your GitHub repository
3. Render will automatically detect `render.yaml`
4. Click "Deploy"

#### Option B: Manual Setup
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `FULLSTACK2008/coaching`
4. Configure:
   - **Name**: coaching-api
   - **Region**: Frankfurt (or closest to you)
   - **Branch**: main
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add Environment Variables:
   - `NODE_ENV`: production
   - `JWT_SECRET`: (generate a strong secret)
   - `ALLOWED_ORIGINS`: `*` (or your frontend domain)
6. Click "Deploy Web Service"

### Step 3: Verify Deployment

#### Check Render Dashboard
- Wait for deployment to complete (green checkmark)
- Click on your service URL
- Test health check: `https://your-app-url.onrender.com/`

#### Test Deployed API
Replace `localhost:3000` with your Render URL:
```bash
GET https://your-app-url.onrender.com/
```

**Expected Response:**
```json
{
  "message": "Task Management API Running"
}
```

#### Test All Endpoints on Production
Use the same test commands but replace:
- `http://localhost:3000` → `https://your-app-url.onrender.com`

---

## 📊 Quick Test Checklist

- [ ] Server starts locally without errors
- [ ] Health check endpoint returns success
- [ ] User registration works with validation
- [ ] Login returns valid JWT token
- [ ] Tasks can be created with categories/priorities/tags
- [ ] Tasks can be filtered by category/priority/tag
- [ ] Statistics endpoint returns correct data
- [ ] Admin dashboard accessible with admin token
- [ ] Rate limiting works (test by sending many requests)
- [ ] Input validation rejects invalid data
- [ ] Protected endpoints require authentication
- [ ] Application deploys successfully to Render
- [ ] All endpoints work on production URL

---

## 🐛 Troubleshooting

### Server Won't Start
```bash
# Check if port is in use
npx kill-port 3000

# Or change PORT in .env
PORT=3001
```

### Dependencies Not Installing
```bash
# Delete node_modules and package-lock.json
rm -r node_modules package-lock.json

# Reinstall
npm install
```

### Environment Variables Not Loading
- Ensure `.env` file is in project root
- Check `dotenv.config()` is called in `server.js`
- Restart server after changing `.env`

### Render Deployment Fails
- Check Render logs for specific errors
- Ensure `Procfile` exists and is correct
- Verify all dependencies are in `package.json`
- Check Node.js version compatibility

---

## 📝 Testing with Postman

### Import Collection
1. Open Postman
2. Click "Import"
3. Create a new collection called "Coaching API"
4. Add the following requests:

**Auth:**
- POST Register
- POST Login

**Tasks:**
- GET All Tasks
- GET Task by ID
- POST Create Task
- PUT Update Task
- DELETE Task
- GET Statistics
- GET Categories
- GET Priorities

**Admin:**
- GET Dashboard
- GET All Users
- GET Activity Logs

### Set Environment Variables in Postman
- `base_url`: `http://localhost:3000` (or your Render URL)
- `token`: (copy from login response)

### Use Variables in Requests
```
{{base_url}}/api/tasks
Authorization: Bearer {{token}}
```

---

**Happy Testing! 🎉**
