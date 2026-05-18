# QUICK START - Backend Developer Guide

## What We Built
✅ Task Management API with:
- Create, Read, Update, Delete Tasks
- JWT Authentication
- Input Validation (Security)
- Error Handling

---

## 🚀 STEP 1: Test Locally
```bash
cd c:\Users\iraki\Documents\OurWebInfo
npm install
npm run dev
```
Server runs on: `http://localhost:3000`

---

## 🔐 STEP 2: Test API

### Get Token (Login)
Use Thunder Client or Postman:
```
POST http://localhost:3000/api/auth/login
{
  "username": "admin",
  "password": "123456"
}
```
Copy the token from response.

### Create Task (Protected)
```
POST http://localhost:3000/api/tasks
Header: Authorization: Bearer {token}
{
  "title": "My First Task"
}
```

### Get All Tasks
```
GET http://localhost:3000/api/tasks
```

### Update Task
```
PUT http://localhost:3000/api/tasks/1
Header: Authorization: Bearer {token}
{
  "title": "Updated Task",
  "completed": true
}
```

### Delete Task
```
DELETE http://localhost:3000/api/tasks/1
Header: Authorization: Bearer {token}
```

---

## 🔧 STEP 3: Maintain (Fix Issues)
If something breaks:
1. Check error message in API response
2. Look at console output
3. Check input validation in `src/controllers/taskController.js`
4. Restart: `npm run dev`

---

## ✨ STEP 4: Add New Features
Example: Add "priority" field to tasks:

**File:** `src/models/taskModel.js`
```javascript
const newTask = {
  id: nextId++,
  title,
  completed: false,
  priority: "medium", // Add this
  userId,
  createdAt: new Date()
};
```

**File:** `src/controllers/taskController.js`
```javascript
const updates = {};
if (title !== undefined) {
  if (typeof title !== "string" || title.length < 3) {
    return res.status(400).json({ success: false, error: "Invalid title" });
  }
  updates.title = title;
}
if (completed !== undefined) {
  updates.completed = Boolean(completed);
}
if (priority !== undefined) { // Add this
  updates.priority = priority;
}
```

Restart and test!

---

## 🔒 STEP 5: Add Security
Security features already added:
- ✅ JWT Token Authentication
- ✅ Input Validation
- ✅ Password Hashing (bcrypt)
- ✅ Helmet.js Security Headers
- ✅ Protected Routes

---

## 📦 STEP 6: Deploy to Disk D

### 6a. Copy to D Drive
```
Copy: c:\Users\iraki\Documents\OurWebInfo
Paste to: D:\OurWebInfo
```

### 6b. Setup & Run
```bash
cd D:\OurWebInfo
npm install
npm start
```

### 6c. Keep Running
Leave terminal open. Server runs on port 3000.

---

## 📝 Summary of Files

| File | Purpose |
|------|---------|
| `server.js` | Main server file |
| `src/models/taskModel.js` | Task data & logic |
| `src/controllers/taskController.js` | Request handlers |
| `src/routes/taskRoutes.js` | API endpoints |
| `src/routes/authRoutes.js` | Login endpoint |
| `src/middleware/authMiddleware.js` | JWT verification |
| `.env` | Environment settings |

---

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Port already in use | Change PORT in .env |
| Token expired | Get new token from login |
| "Invalid token" error | Make sure Authorization header is correct |
| Task not found | Check task ID exists |

---

## ✅ Workflow Summary
1. **Develop** (npm run dev)
2. **Test** (Using TESTING.md)
3. **Maintain** (Fix bugs)
4. **Add Features** (Edit controllers/models)
5. **Secure** (Validate inputs, use JWT)
6. **Deploy** (Copy to D: drive)

Done! 🎉
