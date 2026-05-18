# 🎯 STU LTD Backend Developer - Quick Reference Card

## Your Role
- **Company:** STU LTD (Musanze District)
- **Position:** Backend Developer & Deployment
- **Project:** Task Management API
- **Technology:** Node.js + Express

---

## 📊 COMPLETE WORKFLOW AT A GLANCE

```
┌─────────────────────────────────────────┐
│ 1. INITIALIZE                           │
│ npm install → npm start                 │
│ (Local testing on port 3000)            │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│ 2. MAINTAIN (Fix bugs)                  │
│ - Review code                           │
│ - Fix errors                            │
│ - Test changes                          │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│ 3. DEVELOP (Add features)               │
│ - Edit models                           │
│ - Edit controllers                      │
│ - Add new routes                        │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│ 4. SECURE (Protect features)            │
│ - Input validation ✓                    │
│ - JWT authentication ✓                  │
│ - Password hashing ✓                    │
│ - Protected routes ✓                    │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│ 5. TEST                                 │
│ - Test all endpoints                    │
│ - Verify security                       │
│ - Check error handling                  │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│ 6. DEPLOY TO D: DRIVE                   │
│ Copy → Install → Run → Verify           │
│ npm start (keeps running)               │
└─────────────────────────────────────────┘
```

---

## 🚀 THREE COMMANDS TO REMEMBER

```bash
# Development (with auto-reload)
npm run dev

# Production (on D: drive)
npm start

# Install dependencies
npm install
```

---

## 🔑 THREE FILES YOU'LL EDIT MOST

| File | What to Edit |
|------|--------------|
| `src/models/taskModel.js` | Add fields, change data structure |
| `src/controllers/taskController.js` | Add logic, validation, error handling |
| `src/routes/taskRoutes.js` | Add new endpoints |

---

## 🔐 SECURITY YOU ALREADY HAVE

✅ **JWT Token Auth** - Login required for sensitive operations
✅ **Password Hashing** - bcrypt protects passwords
✅ **Input Validation** - Prevents bad data
✅ **Protected Routes** - Only authenticated users can modify data
✅ **Helmet.js** - Protects HTTP headers

---

## 📝 FILE MAP FOR QUICK ACCESS

When you need to...

| Do this | Edit this file |
|--------|----------------|
| Fix task creation | `src/controllers/taskController.js` → `createTask()` |
| Add new field | `src/models/taskModel.js` → `createTask()` |
| Create new endpoint | `src/routes/taskRoutes.js` → Add new route |
| Fix validation | `src/controllers/taskController.js` → Check input |
| Change security | `src/middleware/authMiddleware.js` |
| Add new route | `server.js` → Add `app.use()` |

---

## 🧪 TESTING ENDPOINTS (Copy-Paste Ready)

### 1. Get Tasks (Easiest - No Auth)
```
GET http://localhost:3000/api/tasks
```

### 2. Login (Get Token)
```
POST http://localhost:3000/api/auth/login
Body: {"username":"admin","password":"123456"}
```

### 3. Create Task (Use token from step 2)
```
POST http://localhost:3000/api/tasks
Header: Authorization: Bearer {PASTE_TOKEN_HERE}
Body: {"title":"My Task"}
```

---

## 📦 DEPLOYMENT CHECKLIST

- [ ] Tests pass locally
- [ ] No console errors
- [ ] Copy folder to D:\OurWebInfo
- [ ] Run npm install
- [ ] Run npm start
- [ ] Test endpoints on D: drive
- [ ] Keep terminal open
- [ ] Server keeps running

---

## 🆘 Emergency Fixes

**Server won't start?**
```bash
npm install
npm start
# Check error message
```

**Port in use?**
Edit `.env`:
```
PORT=3001  # Use different port
```

**Token expired?**
Get new one from login endpoint

**Task not found?**
Check task ID exists with `GET /api/tasks`

---

## 📈 Next Features to Add (After Mastering)

1. **Database** - Replace in-memory with MongoDB
2. **Rate Limiting** - Prevent spam
3. **Logging** - Track errors
4. **User Roles** - Admin vs Regular user
5. **Email Notifications** - Notify on task changes
6. **Search** - Find tasks by keyword
7. **Pagination** - Handle many tasks

---

## ✨ YOU ARE READY!

**What you know now:**
✓ How to run Node.js server
✓ How to build API endpoints
✓ How to add security
✓ How to test endpoints
✓ How to deploy to disk D

**Start with:**
1. Read BEGINNER_GUIDE.md
2. Test endpoints locally
3. Practice adding features
4. Deploy to D: drive

**You're a backend developer now! 🎉**

