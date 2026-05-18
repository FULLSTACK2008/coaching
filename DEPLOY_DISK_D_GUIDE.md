# 📋 STEP-BY-STEP: DEPLOY TO DISK D (Practical Guide)

> **FOR COMPLETE BEGINNERS** - Follow exactly as written

---

## ✅ PRE-DEPLOYMENT CHECKLIST

Before you start, ensure:
- [ ] Node.js installed (`node --version` returns version)
- [ ] Project runs locally (`npm run dev` works)
- [ ] All features tested locally
- [ ] No console.log() debugging left
- [ ] .env file created

---

## 🚀 DEPLOYMENT STEPS

### **STEP 1: Prepare Disk D (2 minutes)**

1. **Open File Explorer** (Windows key + E)
2. **Click "This PC"** → Find Disk **D:**
3. **Right-click** → **New Folder** → Name: `OurWebInfo_Production`
4. **Double-click** the new folder to open it

✅ You now have: `D:\OurWebInfo_Production\` (empty folder)

---

### **STEP 2: Copy Project Files (3 minutes)**

**Important:** Copy files from `C:\Users\iraki\Documents\OurWebInfo\`

1. **Open first File Explorer window**
   - Navigate to: `C:\Users\iraki\Documents\OurWebInfo`

2. **Open second File Explorer window**
   - Navigate to: `D:\OurWebInfo_Production`

3. **Copy these files from C: to D:**
   ```
   ✅ Copy:
   - server.js
   - package.json
   - .env (or create new one)
   - src/ (entire folder)
   - .gitignore (if exists)
   - README.md (if exists)
   
   ❌ DON'T copy:
   - node_modules/ (too big - will reinstall)
   - .git/ (if you prefer fresh)
   ```

**Quick way to copy:**
- Select all files (`Ctrl+A`)
- Right-click → Copy (`Ctrl+C`)
- Go to D: folder
- Right-click → Paste (`Ctrl+V`)
- ⚠️ If asked "Do you want to replace node_modules?" → Click **Skip** or **No**

✅ Now `D:\OurWebInfo_Production\` has your files

---

### **STEP 3: Install Dependencies on Disk D (5 minutes)**

1. **Open PowerShell or CMD**
   - Press `Windows + R`
   - Type: `cmd` or `powershell`
   - Press Enter

2. **Navigate to D: production folder**
   ```bash
   cd D:\OurWebInfo_Production
   ```

3. **Verify you're in right place**
   ```bash
   dir
   ```
   You should see: `server.js`, `package.json`, `src` folder

4. **Install production dependencies**
   ```bash
   npm install --production
   ```
   ⏳ **Wait 2-5 minutes** - lots of text will scroll
   
   ✅ **You'll see:**
   ```
   added XXX packages
   ```

5. **Verify node_modules created**
   ```bash
   dir
   ```
   Now you should see: `node_modules` folder (it's large!)

---

### **STEP 4: Create/Update .env File (2 minutes)**

1. **Check if .env exists**
   ```bash
   dir .env
   ```

2. **If NOT found, create it:**
   - Use Notepad: Right-click → New → Text file
   - Rename to `.env` (remove .txt)
   - Or in PowerShell:
   ```bash
   echo "PORT=3000" > .env
   ```

3. **Edit .env file** (use Notepad)
   ```
   PORT=3000
   NODE_ENV=production
   JWT_SECRET=change-this-to-a-strong-secret-min-32-chars
   DATABASE_URL=mongodb://localhost:27017/ourwebinfo
   LOG_LEVEL=info
   ```
   Save file

---

### **STEP 5: Test Deployment (3 minutes)**

1. **Start the server**
   ```bash
   npm start
   ```

2. **You should see**
   ```
   Server running on port 3000
   ```

3. **Test in another window/browser**
   - Open Browser (Chrome, Edge, Firefox)
   - Go to: `http://localhost:3000/api/users/profile`
   - **Expected response:**
   ```json
   {"message":"User profile data"}
   ```

✅ **SUCCESS! Server is running on Disk D!**

---

### **STEP 6: Stop Server (When Done Testing)**

Press `Ctrl + C` in terminal where server is running

```
^C
[server stops]
```

---

## 📦 FOLDER STRUCTURE AFTER DEPLOYMENT

```
D:\OurWebInfo_Production\
├── server.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
├── node_modules/          (created by npm install)
├── src/
│   ├── controllers/
│   │   └── userController.js
│   └── routes/
│       └── userRoutes.js
└── logs/                  (created when server runs)
```

---

## 🔄 DEPLOYING UPDATES LATER

When you make changes and want to deploy them:

```bash
# Stop current server (if running) - Press Ctrl+C

# Navigate to D:
cd D:\OurWebInfo_Production

# Get latest code
git pull
# OR manually copy updated files

# Install any new dependencies
npm install --production

# Test the server
npm test
# (or manually test endpoints)

# If all good, start server
npm start
```

---

## 🆘 COMMON ISSUES DURING DEPLOYMENT

### **Issue 1: "npm: command not found"**
❌ Node.js not installed  
✅ Solution: Install from https://nodejs.org/, restart terminal

### **Issue 2: "Port 3000 already in use"**
❌ Another program using port  
✅ Solution:
```bash
# Option A: Change port in .env
# PORT=3001

# Option B: Stop other program
taskkill /F /IM node.exe
```

### **Issue 3: "Cannot find module 'express'"**
❌ npm install didn't complete  
✅ Solution:
```bash
npm install --production
# Run it again if it failed
```

### **Issue 4: Response: 404 Not Found**
❌ Wrong URL  
✅ Solution: Try: `http://localhost:3000/api/users/profile`

### **Issue 5: Cannot see D: drive**
❌ Disk D not accessible  
✅ Solution:
- Check if D: drive exists in File Explorer
- Use `diskpart` command or format disk first

---

## 🎯 WHAT YOU ACCOMPLISHED

✅ Copied project to production folder (D:)  
✅ Installed all required dependencies  
✅ Set up environment variables (.env)  
✅ Successfully started production server  
✅ Verified API endpoints work  

---

## 📝 NEXT STEPS

### **Now that D: is deployed:**

1. **Development:** Continue coding in `C:\Users\iraki\Documents\OurWebInfo`
   ```bash
   cd C:\Users\iraki\Documents\OurWebInfo
   npm run dev
   ```

2. **Testing:** After each feature, update D: version
   - Copy files or `git pull` in D:
   - `npm install`
   - `npm start`

3. **Monitoring:** Keep D: version running in production
   - Check logs regularly
   - Monitor for errors
   - Restart if crashes

---

## 🔐 PRODUCTION REMINDERS

- [ ] .env file is NOT in git (keep secrets safe)
- [ ] Regularly run `npm audit` for security updates
- [ ] Keep server running with process manager (PM2)
- [ ] Set up automated backups
- [ ] Monitor server logs

---

## 💾 BACKUP & RESTORE

### **Backup production to USB:**
```bash
# Stop server first (Ctrl+C)
# Copy entire D:\OurWebInfo_Production to USB
```

### **Restore from backup:**
```bash
# Copy folder from USB back to D:
# Run: npm install
# Run: npm start
```

---

## 🎓 WHAT YOU LEARNED

✓ How to deploy Node.js to local disk  
✓ How to manage dependencies (npm)  
✓ How to set up environment variables  
✓ How to run and test a server  
✓ How to troubleshoot common issues  

---

**🎉 Congratulations! You've deployed your first backend! 🎉**

For detailed guides, see:
- `DEPLOYMENT_GUIDE.md` - Full reference
- `TROUBLESHOOTING.md` - Problem solving
- `DEVELOPMENT_WORKFLOW.md` - Adding features
- `SECURITY_PRODUCTION.md` - Security best practices

