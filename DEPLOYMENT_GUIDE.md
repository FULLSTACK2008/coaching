# OurWebInfo Backend - Complete Deployment & Development Guide

**For: STU LTD Backend Developer**  
**Project:** OurWebInfo (Node.js Express Application)  
**Target:** Deploy to Local Disk D:

---

## 📋 TABLE OF CONTENTS

1. [Project Setup](#1-project-setup)
2. [Deploy to Disk D](#2-deploy-to-disk-d)
3. [Development Workflow](#3-development-workflow)
4. [Security Implementation](#4-security-implementation)
5. [Testing Guide](#5-testing-guide)
6. [Deployment Process](#6-deployment-process)
7. [Maintenance & Upgrades](#7-maintenance--upgrades)

---

## 1️⃣ PROJECT SETUP

### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for version control)
- **Postman** or **Insomnia** (for API testing)

### Current Project Structure
```
OurWebInfo/
├── server.js                 # Main entry point
├── package.json              # Dependencies & scripts
├── .env                       # Environment variables
├── src/
│   ├── controllers/           # Business logic
│   │   └── userController.js
│   └── routes/                # API endpoints
│       └── userRoutes.js
└── node_modules/             # Dependencies (don't commit)
```

### Step 1: Verify Project Installation

```bash
# Navigate to project folder (C:\Users\iraki\Documents\OurWebInfo)
cd C:\Users\iraki\Documents\OurWebInfo

# Check if all dependencies are installed
npm list

# If NOT installed, install them:
npm install
```

---

## 2️⃣ DEPLOY TO DISK D

### Step-by-Step Deployment to D:

#### **Option A: Copy Current Project**

1. **Open File Explorer**
   - Right-click Disk D: → New Folder → Name it `OurWebInfo_Production`

2. **Copy Project Files**
   ```
   C:\Users\iraki\Documents\OurWebInfo → D:\OurWebInfo_Production
   ```
   ⚠️ **IMPORTANT:** Do NOT copy `node_modules/` folder (too large)

3. **Install Dependencies on D:**
   ```bash
   # In PowerShell/CMD
   cd D:\OurWebInfo_Production
   npm install --production
   ```

#### **Option B: Clone from Repository** (Best Practice)
```bash
cd D:\
git clone <your-repo-url> OurWebInfo_Production
cd OurWebInfo_Production
npm install --production
```

### Step 3: Create .env File (D: version)

Create `D:\OurWebInfo_Production\.env`:
```
PORT=3000
NODE_ENV=production
JWT_SECRET=your-secret-key-change-this
DATABASE_URL=your-database-url
```

### Step 4: Verify Deployment

```bash
cd D:\OurWebInfo_Production
npm start

# Expected output:
# Server running on port 3000
```

✅ **Deployment Complete!**

---

## 3️⃣ DEVELOPMENT WORKFLOW

### A. Development Environment (C:\ - for coding)

#### Start Development Server
```bash
cd C:\Users\iraki\Documents\OurWebInfo
npm run dev
```
- Uses **nodemon** (auto-restarts on file changes)
- Runs on `http://localhost:3000`

### B. Standard Development Process

```
CREATE FEATURE BRANCH
        ↓
WRITE CODE & TEST LOCALLY
        ↓
COMMIT & PUSH TO REPOSITORY
        ↓
COPY TO D: AND TEST PRODUCTION
        ↓
IF ISSUES → FIX AND REPEAT
        ↓
DEPLOY & MONITOR
```

### C. File Organization Tips

**Create a new feature:**
```
1. New Controller: src/controllers/newFeatureController.js
2. New Routes: src/routes/newFeatureRoutes.js
3. Link in: server.js
```

**Example: Adding Product Feature**

Create `src/controllers/productController.js`:
```javascript
exports.getProducts = (req, res) => {
  res.json({ message: "Product list" });
};

exports.createProduct = (req, res) => {
  const { name, price } = req.body;
  // Add validation & database logic
  res.status(201).json({ message: "Product created" });
};
```

Create `src/routes/productRoutes.js`:
```javascript
const express = require("express");
const router = express.Router();
const { getProducts, createProduct } = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", createProduct);

module.exports = router;
```

Update `server.js`:
```javascript
const productRoutes = require("./src/routes/productRoutes");
app.use("/api/products", productRoutes);
```

---

## 4️⃣ SECURITY IMPLEMENTATION

### Current Security Setup ✅
- **Helmet**: Protects against common vulnerabilities
- **bcrypt**: For password hashing (when needed)
- **JWT**: For authentication tokens
- **dotenv**: Manages secrets (not hardcoded)

### Add Authentication Middleware

Create `src/middleware/authMiddleware.js`:
```javascript
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
```

### Add Input Validation

Install validator:
```bash
npm install express-validator
```

Example in controller:
```javascript
const { body, validationResult } = require("express-validator");

exports.validateUser = [
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
];

exports.createUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Create user logic
};
```

### Security Checklist

- [ ] All passwords hashed with bcrypt
- [ ] JWT tokens validated
- [ ] Input validation on all endpoints
- [ ] CORS configured (if needed)
- [ ] Sensitive data NOT in .env file stored in repo
- [ ] HTTPS enabled in production
- [ ] Rate limiting implemented

---

## 5️⃣ TESTING GUIDE

### A. Manual Testing (Using Postman)

#### Test Existing Endpoint:
1. **Open Postman** → New Request
2. **Method:** GET
3. **URL:** `http://localhost:3000/api/users/profile`
4. **Send** → Check response

#### Test New Endpoint:
1. **Method:** POST
2. **URL:** `http://localhost:3000/api/products`
3. **Body** (JSON):
   ```json
   {
     "name": "Test Product",
     "price": 99.99
   }
   ```

### B. Automated Testing (Recommended for Production)

Install testing framework:
```bash
npm install --save-dev jest supertest
```

Create `tests/userController.test.js`:
```javascript
const request = require("supertest");
const app = require("../server.js");

describe("User API", () => {
  test("GET /api/users/profile should return profile data", async () => {
    const response = await request(app).get("/api/users/profile");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});
```

Run tests:
```bash
npm test
```

### C. Testing Checklist

- [ ] All endpoints return correct status codes
- [ ] Input validation works (reject invalid data)
- [ ] Error messages are clear
- [ ] Authentication required endpoints return 401 without token
- [ ] Sensitive data not exposed in responses

---

## 6️⃣ DEPLOYMENT PROCESS

### Deployment Checklist

```
STEP 1: Code Review
  ☐ Code follows project standards
  ☐ No console.log() left in code
  ☐ No hardcoded secrets
  ☐ All tests passing

STEP 2: Version Update
  ☐ Update package.json version
  ☐ Create git tag: git tag v1.0.1

STEP 3: Copy to Production (D:)
  ☐ cd D:\OurWebInfo_Production
  ☐ git pull (or copy new files)
  ☐ npm install --production
  ☐ npm test (run tests)

STEP 4: Environment Setup
  ☐ Update .env for production
  ☐ Verify database connections
  ☐ Check all secrets are set

STEP 5: Deploy & Test
  ☐ npm start
  ☐ Test endpoints with Postman
  ☐ Monitor logs for errors

STEP 6: Rollback Plan (if issues)
  ☐ Keep previous version backup
  ☐ Quick rollback script ready
```

### Quick Deployment Script

Create `deploy.ps1` (PowerShell):
```powershell
# Stop old server (if running)
Stop-Process -Name node -Force -ErrorAction SilentlyContinue

# Navigate to production folder
cd D:\OurWebInfo_Production

# Update code
git pull

# Install dependencies
npm install --production

# Run tests
npm test

# If tests pass, start server
npm start
```

Run deployment:
```powershell
powershell -ExecutionPolicy Bypass -File deploy.ps1
```

---

## 7️⃣ MAINTENANCE & UPGRADES

### Weekly Maintenance

```bash
# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies (carefully)
npm outdated
npm update
```

### When Upgrading Existing Features

1. **Create feature branch:**
   ```bash
   git checkout -b upgrade/feature-name
   ```

2. **Make changes** in development folder (C:\)

3. **Test thoroughly:**
   ```bash
   npm test
   npm run dev
   ```

4. **Commit & push:**
   ```bash
   git add .
   git commit -m "Upgrade: improve feature X"
   git push
   ```

5. **Deploy to D: (Production)**

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port already in use | Change PORT in .env or kill process: `npx kill-port 3000` |
| Dependencies not working | Delete `node_modules/` and `package-lock.json`, then `npm install` |
| Environment variables not loading | Check .env file path and `dotenv.config()` in server.js |
| Authentication failing | Verify JWT_SECRET matches in .env |

---

## 📞 QUICK REFERENCE

### Essential Commands

```bash
# Installation
npm install                # Install all dependencies
npm install package-name   # Install single package
npm install -D package     # Install as dev dependency

# Development
npm run dev               # Start with auto-reload
npm start                 # Start production server
npm test                  # Run tests

# Maintenance
npm audit                 # Check security
npm update               # Update dependencies
npm list                 # Show installed packages
```

### Directory Structure for Growth

```
OurWebInfo/
├── server.js
├── package.json
├── .env
├── .gitignore
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/        # NEW: Auth, validation
│   ├── models/            # NEW: Database schemas
│   ├── services/          # NEW: Business logic
│   └── config/            # NEW: Configuration
├── tests/                 # NEW: Test files
├── logs/                  # NEW: Application logs
└── docs/                  # NEW: Documentation
```

---

## ✅ NEXT STEPS

1. **Follow Section 2** to deploy to Disk D:
2. **Follow Section 3** to start development
3. **Follow Section 4** to secure the application
4. **Follow Section 5** to test everything
5. **Use Section 6** when ready to deploy changes

---

**Last Updated:** May 2026  
**Version:** 1.0
