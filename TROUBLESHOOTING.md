# 🔧 TROUBLESHOOTING GUIDE

## Common Problems & Solutions

### Problem 1: "npm: command not found"
**Cause:** Node.js not installed  
**Solution:**
1. Download Node.js from https://nodejs.org/
2. Install it (use LTS version)
3. Restart your computer
4. Try `npm --version` in new terminal

---

### Problem 2: "Port 3000 already in use"
**Cause:** Another app using port 3000  

**Solution Option A:**
```bash
# Find and stop the process (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID-number> /F
```

**Solution Option B:**
Change port in `.env`:
```
PORT=3001
```

Then start server:
```bash
npm start
```

---

### Problem 3: "Cannot find module 'express'"
**Cause:** Dependencies not installed  

**Solution:**
```bash
# Delete old files
del node_modules /Q
del package-lock.json

# Reinstall
npm install
```

---

### Problem 4: "npm ERR! code ENOENT"
**Cause:** Wrong directory or missing files  

**Solution:**
```bash
# Verify you're in correct folder
cd C:\Users\iraki\Documents\OurWebInfo

# Check server.js exists
dir server.js

# Check package.json exists
dir package.json

# If files missing, restore from backup
```

---

### Problem 5: ".env file not found"
**Cause:** Environment file missing  

**Solution:**
Create `.env` file in project root:
```
PORT=3000
NODE_ENV=development
JWT_SECRET=your-temporary-secret
```

---

### Problem 6: "EACCES: permission denied"
**Cause:** Permission issue (mostly on Mac/Linux)  

**Solution (Windows):**
1. Run terminal as Administrator
2. Try again

---

### Problem 7: Server starts but nothing loads
**Cause:** Firewall blocking or wrong IP  

**Solution:**
```bash
# Verify server is actually running
netstat -ano | findstr :3000

# Try different URL:
http://127.0.0.1:3000/api/users/profile
# OR
http://localhost:3000/api/users/profile
```

---

### Problem 8: "npm ERR! ERR! code ERESOLVE"
**Cause:** Dependency conflict  

**Solution:**
```bash
npm install --legacy-peer-deps
```

---

### Problem 9: Changes not showing up
**Cause:** Auto-reload not working (using `npm start` instead of `npm run dev`)  

**Solution:**
```bash
# Stop server (Ctrl + C)
# Then use:
npm run dev

# This uses nodemon for auto-reload
```

---

### Problem 10: "Cannot POST /api/users"
**Cause:** Route not configured  

**Solution:**
1. Check route exists in `src/routes/userRoutes.js`
2. Check route is imported in `server.js`
3. Verify method (GET vs POST) matches

Example - Add POST endpoint:
```javascript
// In src/routes/userRoutes.js
router.post("/create", createUser);
```

---

## Debug Mode - Check What's Wrong

```bash
# Set debug mode (Windows)
set DEBUG=*
npm run dev

# This shows detailed information about what's happening
```

---

## Still Stuck?

**Checklist:**
- [ ] Node.js installed? (run `node --version`)
- [ ] In correct folder? (run `dir server.js`)
- [ ] Dependencies installed? (folder `node_modules` exists?)
- [ ] .env file exists?
- [ ] Port 3000 free?
- [ ] Tried restarting terminal?
- [ ] Tried restarting computer?

**If still stuck:**
1. Note the exact error message
2. Take a screenshot
3. Ask your senior developer

---

**Pro Tip:** Always check error messages carefully - they usually tell you exactly what's wrong!
