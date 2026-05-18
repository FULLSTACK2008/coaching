# 🔐 SECURITY & PRODUCTION CHECKLIST

## Pre-Deployment Security Checklist

### 1. Code Security
- [ ] No hardcoded passwords or secrets in code
- [ ] No sensitive data in console.log()
- [ ] All user inputs validated
- [ ] SQL Injection protection (using parameterized queries)
- [ ] XSS Protection (using helmet, sanitizing inputs)
- [ ] CSRF tokens implemented (if needed)

### 2. Environment Security
- [ ] .env file NOT in git repository
- [ ] Different .env for dev and production
- [ ] Secrets never exposed in logs
- [ ] Database passwords strong (min 12 characters)
- [ ] API keys rotated regularly

### 3. API Security
- [ ] All sensitive endpoints require authentication
- [ ] Rate limiting implemented (prevent brute force)
- [ ] CORS properly configured
- [ ] HTTPS enabled in production
- [ ] API versioning implemented (/api/v1/)
- [ ] Error messages don't leak sensitive info

### 4. Database Security
- [ ] Database backups automated
- [ ] Database password strong
- [ ] Database restricted to localhost only
- [ ] No direct SQL queries (use ORMs)
- [ ] Regular security patches applied

---

## Example: Add Rate Limiting

Install package:
```bash
npm install express-rate-limit
```

Add to server.js:
```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Apply to all requests
app.use(limiter);

// Or apply to specific routes
app.use("/api/login", limiter);
```

---

## Example: Secure User Password

Install bcrypt (already in package.json):

```javascript
// In userController.js
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const { email, password } = req.body;
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Save user with hashed password
  const user = {
    email,
    password: hashedPassword // Never store plain password!
  };
  
  res.json({ message: "User created", user });
};

// Verify password
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  // Get user from database
  const user = { password: "hashedPasswordFromDB" }; // Example
  
  // Compare password
  const isValid = await bcrypt.compare(password, user.password);
  
  if (!isValid) {
    return res.status(401).json({ error: "Invalid password" });
  }
  
  res.json({ message: "Login successful" });
};
```

---

## Example: Secure .gitignore

Create `.gitignore`:
```
# Dependencies
node_modules/
npm-debug.log

# Environment variables
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Build
dist/
build/

# Temporary
tmp/
temp/
```

---

## Production Deployment Checklist

### Before Going Live

**Code Quality:**
- [ ] Run `npm audit` - no critical vulnerabilities
- [ ] All tests passing
- [ ] Code reviewed by senior developer
- [ ] No debug code left (console.log, debugger, etc)
- [ ] Error handling comprehensive
- [ ] Logging configured

**Environment:**
- [ ] Production .env configured
- [ ] Database backups setup
- [ ] Monitoring/alerting configured
- [ ] HTTPS certificate installed
- [ ] Firewall rules set

**Documentation:**
- [ ] README updated with setup instructions
- [ ] API documentation complete
- [ ] Deployment steps documented
- [ ] Rollback plan documented

---

## Deployment to Production (D: drive)

### Full Deployment Process

```bash
# 1. Stop current server (if running)
# Open Task Manager → End "node.exe" process

# 2. Navigate to production
cd D:\OurWebInfo_Production

# 3. Backup current version
Copy-Item . ..\ -Recurse -Force # Creates backup

# 4. Pull latest code
git pull

# 5. Install dependencies
npm install --production

# 6. Run security check
npm audit

# 7. Run tests
npm test

# 8. Check .env
# Edit D:\OurWebInfo_Production\.env
# Verify all production values are correct

# 9. Start server
npm start

# 10. Verify in browser
# Open http://localhost:3000/api/users/profile
```

---

## Monitoring Production

### View Server Logs

```bash
# If server still running in terminal, watch logs directly
# Logs show errors, requests, warnings

# Common log messages:
# "Server running on port 3000" = Good ✅
# "Error: ENOENT" = File not found ❌
# "Error: Port 3000 in use" = Another app on port ❌
```

### Setup Log File

Update server.js:
```javascript
const fs = require("fs");
const path = require("path");

// Create logs directory if not exists
if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs");
}

// Log to file
const logFile = fs.createWriteStream("logs/app.log", { flags: "a" });
console.log = function(...args) {
  const timestamp = new Date().toISOString();
  const message = `[${timestamp}] ${args.join(" ")}\n`;
  logFile.write(message);
  process.stdout.write(message);
};
```

View logs:
```bash
# See last 50 lines
Get-Content logs/app.log -Tail 50

# Follow live logs
Get-Content logs/app.log -Wait
```

---

## Handling Production Errors

### Common Production Issues

**Issue: Server crashes suddenly**
```bash
# Check logs
Get-Content logs/app.log

# Look for: Error messages, stack traces
# Fix: Apply security update, increase memory, check database
```

**Issue: Slow responses**
```bash
# Check database connection
# Check for blocking operations
# Optimize slow queries
# Increase server resources
```

**Issue: High memory usage**
```bash
# Check for memory leaks
# Restart server to free memory (temporary)
# npm install --save clinic
# Run diagnosis
```

---

## Keep Production Secure

### Daily Tasks
- [ ] Review error logs
- [ ] Monitor server health
- [ ] Check for failed logins

### Weekly Tasks
- [ ] Run `npm audit`
- [ ] Update dependencies (test first)
- [ ] Backup database
- [ ] Check disk space

### Monthly Tasks
- [ ] Security review
- [ ] Performance review
- [ ] Update documentation
- [ ] Review user activity

---

## Rollback (Undo Bad Deployment)

If something breaks in production:

```bash
cd D:\OurWebInfo_Production

# Option 1: Use Git to go back
git log --oneline              # See previous versions
git revert <commit-hash>       # Undo that commit
npm install
npm start

# Option 2: Use backup
# Stop server (Ctrl+C)
# Copy backup folder back
# npm install
# npm start
```

---

## Environment Variables for Production

**Create D:\OurWebInfo_Production\.env:**
```
PORT=3000
NODE_ENV=production
JWT_SECRET=use-strong-random-secret-here-minimum-32-chars
DATABASE_URL=mongodb://prod-server:27017/ourwebinfo
DB_USER=production-user
DB_PASSWORD=strong-password-min-16-chars
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
LOG_LEVEL=info
ENABLE_METRICS=true
```

⚠️ **NEVER:** Commit .env file to git!

---

## Zero-Downtime Deployment (Advanced)

For updates without stopping server:

```bash
# Terminal 1: Old server
cd D:\OurWebInfo_Production
npm start

# Terminal 2: New server (on different port)
npm start --port=3001

# Terminal 3: Test new server
curl http://localhost:3001/api/users/profile

# If works, switch traffic:
# Load balancer or reverse proxy redirects to :3001
# Stop old server on :3000
```

---

**Remember:** Security is everyone's responsibility! 🔐
