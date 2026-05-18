# 📊 VISUAL WORKFLOW - Task Management API

## Complete Development Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                    TASK MANAGEMENT API PROJECT                  │
│                    (STU LTD Backend Developer)                  │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
        ┌────────────────────────────────────────────┐
        │ PHASE 1: INITIALIZE                        │
        ├────────────────────────────────────────────┤
        │ npm install                                │
        │ npm start                                  │
        │ Server runs on: http://localhost:3000      │
        │ Status: ✅ RUNNING                         │
        └────────────────┬───────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────────────────┐
        │ PHASE 2: TEST EXISTING FEATURES            │
        ├────────────────────────────────────────────┤
        │ ✅ GET /api/tasks                          │
        │ ✅ GET /api/tasks/:id                      │
        │ ✅ POST /api/auth/login                    │
        └────────────────┬───────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────────────────┐
        │ PHASE 3: MAINTAIN CODE                     │
        ├────────────────────────────────────────────┤
        │ Files to Edit:                             │
        │ • src/models/taskModel.js                  │
        │ • src/controllers/taskController.js        │
        │ • src/routes/taskRoutes.js                 │
        │                                            │
        │ Fix bugs → Test → Redeploy                 │
        └────────────────┬───────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────────────────┐
        │ PHASE 4: ADD NEW FEATURES                  │
        ├────────────────────────────────────────────┤
        │ ✅ POST /api/tasks (Create)                │
        │ ✅ PUT /api/tasks/:id (Update)             │
        │ ✅ DELETE /api/tasks/:id (Delete)          │
        │                                            │
        │ Edit Model → Edit Controller → Test        │
        └────────────────┬───────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────────────────┐
        │ PHASE 5: ADD SECURITY                      │
        ├────────────────────────────────────────────┤
        │ ✅ JWT Authentication                      │
        │ ✅ Input Validation                        │
        │ ✅ Password Hashing                        │
        │ ✅ Protected Routes                        │
        │ ✅ Helmet.js Headers                       │
        │                                            │
        │ Files:                                     │
        │ • src/middleware/authMiddleware.js         │
        │ • src/controllers/ (validation)            │
        └────────────────┬───────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────────────────┐
        │ PHASE 6: TEST THOROUGHLY                   │
        ├────────────────────────────────────────────┤
        │ Testing Steps:                             │
        │ 1. Health check: GET /                     │
        │ 2. Get tasks: GET /api/tasks               │
        │ 3. Login: POST /api/auth/login             │
        │ 4. Create task: POST /api/tasks (token)    │
        │ 5. Update task: PUT /api/tasks/1 (token)   │
        │ 6. Delete task: DELETE /api/tasks/1 (token)│
        │                                            │
        │ See: TESTING.md                            │
        └────────────────┬───────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────────────────┐
        │ PHASE 7: DEPLOY TO DISK D                  │
        ├────────────────────────────────────────────┤
        │ Steps:                                     │
        │ 1. Copy: c:\Users\iraki\Documents\         │
        │          OurWebInfo                        │
        │ 2. Paste to: D:\OurWebInfo                 │
        │ 3. Run: cd D:\OurWebInfo                   │
        │ 4. Run: npm install                        │
        │ 5. Run: npm start                          │
        │ 6. Verify: http://localhost:3000           │
        │ 7. Keep running: Terminal stays open       │
        └────────────────┬───────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────────────────┐
        │ PRODUCTION RUNNING                         │
        ├────────────────────────────────────────────┤
        │ Location: D:\OurWebInfo                    │
        │ Status: 🟢 Running                         │
        │ Port: 3000                                 │
        │                                            │
        │ Next: Monitor & Maintain                   │
        └────────────────────────────────────────────┘
```

---

## API ENDPOINTS DIAGRAM

```
┌─────────────────────────────────────────┐
│        EXPRESS SERVER (Port 3000)       │
└────────────┬────────────────────────────┘
             │
    ┌────────┴────────────────────┐
    │                             │
    ▼                             ▼
┌──────────────────┐      ┌──────────────────┐
│   Auth Routes    │      │   Task Routes    │
├──────────────────┤      ├──────────────────┤
│ POST /login      │      │ GET / (all)      │
│   ↓              │      │ GET /:id         │
│ Check username   │      │ POST / (protected)
│ Check password   │      │ PUT /:id (prot)  │
│ Generate JWT     │      │ DELETE /:id (prot)
│ Return token     │      │                  │
└──────────────────┘      └──────────────────┘
                                 │
                          ┌──────┴──────┐
                          ▼             ▼
                     ┌──────────┐  ┌──────────────┐
                     │  Model   │  │  Middleware  │
                     ├──────────┤  ├──────────────┤
                     │ taskData │  │ Auth check   │
                     │ CRUD ops │  │ Validation   │
                     │          │  │              │
                     └──────────┘  └──────────────┘
```

---

## FILE RELATIONSHIPS

```
┌─────────────────────────────────────────┐
│          server.js (Main)               │
│  (Loads and connects everything)        │
└────────────┬────────────────────────────┘
             │
    ┌────────┴─────────────────────────┐
    │                                  │
    ▼                                  ▼
┌──────────────────┐          ┌──────────────────┐
│  taskRoutes.js   │          │  authRoutes.js   │
│  (Endpoints)     │          │  (Login)         │
└────────┬─────────┘          └────────┬─────────┘
         │                             │
         ▼                             ▼
┌──────────────────────┐       ┌──────────────────┐
│ taskController.js    │       │ User validation  │
│ (Request handlers)   │       │ Token generation │
└────────┬─────────────┘       └──────────────────┘
         │
         ▼
┌──────────────────────┐
│ taskModel.js         │
│ (Data storage)       │
└──────────────────────┘

All protected routes use:
         ▼
┌──────────────────────┐
│ authMiddleware.js    │
│ (JWT verification)   │
└──────────────────────┘
```

---

## DAILY WORKFLOW LOOP

```
┌────────────────────────────────────────────┐
│ 1. START DAY                               │
│    npm run dev                             │
│    (Server with auto-reload)               │
└────────────┬───────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────┐
│ 2. CODE                                    │
│    Edit files in src/                      │
└────────────┬───────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────┐
│ 3. SAVE                                    │
│    (Auto-reload triggered)                 │
└────────────┬───────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────┐
│ 4. TEST                                    │
│    Use TESTING.md guide                    │
│    Use Postman/Thunder Client              │
└────────────┬───────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────┐
│ 5. FIX (if errors)                         │
│    Debug → Edit → Save → Test              │
└────────────┬───────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────┐
│ 6. VERIFY                                  │
│    All tests pass ✅                       │
└────────────┬───────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────┐
│ 7. DEPLOY (when ready)                     │
│    Copy to D:\                             │
│    Run on D: drive                         │
└────────────────────────────────────────────┘
```

---

## SECURITY LAYERS

```
┌────────────────────────────────────────────┐
│ Layer 1: HTTP Security Headers             │
│ (Helmet.js)                                │
└────────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────────┐
│ Layer 2: Input Validation                  │
│ (Check data type, length, format)          │
└────────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────────┐
│ Layer 3: Authentication                    │
│ (JWT Token Check)                          │
└────────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────────┐
│ Layer 4: Authorization                     │
│ (Check user permissions)                   │
└────────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────────┐
│ Layer 5: Data Storage                      │
│ (Safe, validated data)                     │
└────────────────────────────────────────────┘
```

---

## DECISION TREE: Which File to Edit?

```
                   What to change?
                        │
        ┌───────────────┬┴───────────────┐
        │               │                │
        ▼               ▼                ▼
    Add data        Add logic        Add route
    structure?      to request?      to API?
        │               │                │
        ▼               ▼                ▼
    taskModel.js   taskController.js   taskRoutes.js
    └───────────────┬──────────────────┘
                    │
            All changes in src/
```

---

## DEPLOYMENT CHECKLIST

```
┌─────────────────────────────────────────┐
│ PRE-DEPLOYMENT                          │
├─────────────────────────────────────────┤
│ ☐ npm install (done)                    │
│ ☐ npm start (runs successfully)         │
│ ☐ All tests pass                        │
│ ☐ No console errors                     │
│ ☐ .env configured correctly             │
└─────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────┐
│ DEPLOYMENT TO D:                        │
├─────────────────────────────────────────┤
│ 1. Copy folder to D:\OurWebInfo         │
│ 2. cd D:\OurWebInfo                     │
│ 3. npm install                          │
│ 4. npm start                            │
│ 5. Verify endpoints                     │
│ 6. Keep terminal open                   │
└─────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────┐
│ POST-DEPLOYMENT                         │
├─────────────────────────────────────────┤
│ ✓ Server running on D: drive            │
│ ✓ API accessible on port 3000           │
│ ✓ Endpoints working                     │
│ ✓ Security enabled                      │
└─────────────────────────────────────────┘
```

---

## FILE SIZE REFERENCE

```
Core Files:
├── server.js                     ~50 lines
├── src/models/taskModel.js      ~60 lines
├── src/controllers/taskController.js  ~80 lines
├── src/routes/taskRoutes.js     ~20 lines
├── src/routes/authRoutes.js     ~45 lines
└── src/middleware/authMiddleware.js   ~25 lines

All files are SMALL and EASY to understand!
```

---

**This diagram shows the complete backend development workflow. Study it to understand how everything connects!**
