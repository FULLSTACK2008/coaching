# Deployment to Disk D

## Step 1: Prepare Project
```bash
npm install
```

## Step 2: Copy to Disk D
1. Open File Explorer
2. Go to: `c:\Users\iraki\Documents\OurWebInfo`
3. Copy entire folder
4. Paste to: `D:\OurWebInfo`

## Step 3: Run on Disk D
```bash
cd D:\OurWebInfo
npm install
npm start
```

## Step 4: Verify
- Server should run on `http://localhost:3000`
- Test endpoints with TESTING.md

## Step 5: Keep Running (Background)
```bash
npm start
# Server runs in background
# Terminal stays open
```

---

## Environment Setup (D Drive)
Create `.env` file in D:\OurWebInfo with:
```
PORT=3000
JWT_SECRET=production-secret-key-12345
NODE_ENV=production
```
