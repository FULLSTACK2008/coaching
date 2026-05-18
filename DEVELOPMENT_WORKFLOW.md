# 📂 DEVELOPMENT WORKFLOW - STEP BY STEP

## Scenario 1: Adding a New Feature (Example: Products)

### Phase 1️⃣: PLAN (5 mins)
- [ ] What does it do?
- [ ] What data is needed?
- [ ] What endpoints? (GET, POST, PUT, DELETE)

**Example:**
- Feature: Product Management
- Endpoints: GET all products, GET one, CREATE, UPDATE, DELETE
- Data: name, price, description

### Phase 2️⃣: CODE (20-30 mins)

#### Step A: Create Controller
File: `src/controllers/productController.js`

```javascript
// Get all products
exports.getAllProducts = (req, res) => {
  // TODO: Get from database
  const products = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Mouse", price: 50 }
  ];
  res.json(products);
};

// Get single product
exports.getProductById = (req, res) => {
  const { id } = req.params;
  res.json({ id, name: "Product " + id, price: 100 });
};

// Create product
exports.createProduct = (req, res) => {
  const { name, price, description } = req.body;
  
  // Validation
  if (!name || !price) {
    return res.status(400).json({ error: "Name and price required" });
  }
  
  // TODO: Save to database
  const newProduct = { id: Date.now(), name, price, description };
  res.status(201).json(newProduct);
};

// Update product
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  
  // TODO: Update in database
  res.json({ id, name, price, message: "Updated" });
};

// Delete product
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  // TODO: Delete from database
  res.json({ message: "Product deleted", id });
};
```

#### Step B: Create Routes
File: `src/routes/productRoutes.js`

```javascript
const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

// All routes
router.get("/", getAllProducts);              // GET /api/products
router.get("/:id", getProductById);           // GET /api/products/1
router.post("/", createProduct);              // POST /api/products
router.put("/:id", updateProduct);            // PUT /api/products/1
router.delete("/:id", deleteProduct);         // DELETE /api/products/1

module.exports = router;
```

#### Step C: Register Routes in Server
File: `server.js`

Add this line after existing routes:
```javascript
const productRoutes = require("./src/routes/productRoutes");
app.use("/api/products", productRoutes);
```

### Phase 3️⃣: TEST LOCALLY (10 mins)

Start development server:
```bash
npm run dev
```

Test each endpoint in Postman:

**1. GET all products**
```
Method: GET
URL: http://localhost:3000/api/products
```

**2. GET single product**
```
Method: GET
URL: http://localhost:3000/api/products/1
```

**3. CREATE product**
```
Method: POST
URL: http://localhost:3000/api/products
Body (JSON):
{
  "name": "Keyboard",
  "price": 80,
  "description": "Mechanical keyboard"
}
```

**4. UPDATE product**
```
Method: PUT
URL: http://localhost:3000/api/products/1
Body (JSON):
{
  "name": "Updated Laptop",
  "price": 1200
}
```

**5. DELETE product**
```
Method: DELETE
URL: http://localhost:3000/api/products/1
```

### Phase 4️⃣: COMMIT & PUSH (5 mins)

```bash
# See what changed
git status

# Add all changes
git add .

# Commit with message
git commit -m "feat: add product management endpoints"

# Push to repository
git push
```

### Phase 5️⃣: DEPLOY TO DISK D (5 mins)

```bash
# Go to production folder
cd D:\OurWebInfo_Production

# Get latest code
git pull

# Install any new dependencies
npm install

# Test
npm test

# If all good, start
npm start
```

---

## Scenario 2: Fixing a Bug

### Quick Bug Fix Process

```
1. Identify bug (error in logs)
   ↓
2. Create fix branch: git checkout -b fix/bug-name
   ↓
3. Find and fix code
   ↓
4. Test locally: npm run dev
   ↓
5. Commit: git commit -m "fix: describe what fixed"
   ↓
6. Push: git push
   ↓
7. Deploy: copy to D:\, test, npm start
```

**Example: Fix user profile endpoint**

1. Error: "Cannot read property 'name' of undefined"
2. Check `src/controllers/userController.js`
3. Add null check:
```javascript
exports.getProfile = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json({ name: req.user.name, email: req.user.email });
};
```
4. Test and deploy

---

## Scenario 3: Updating Existing Feature

### Enhancement Process

Example: Add authentication to user profile endpoint

**Before:**
```javascript
router.get("/profile", getProfile);
```

**After:**
```javascript
const authMiddleware = require("../middleware/authMiddleware");
router.get("/profile", authMiddleware, getProfile);
```

This requires the user to send a valid JWT token.

---

## Common Git Commands (Save These!)

```bash
# See your changes
git status

# Add files to commit
git add .
git add filename.js

# Commit changes
git commit -m "message describing what changed"

# Send to repository
git push

# Get latest changes from repository
git pull

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout branch-name

# See commit history
git log

# Undo last commit (dangerous!)
git reset --hard HEAD~1
```

---

## File Organization Tips

✅ **DO:**
```
src/
  ├── controllers/    (business logic)
  ├── routes/         (endpoint definitions)
  ├── middleware/     (auth, validation)
  └── services/       (reusable functions)
```

❌ **DON'T:**
```
src/
  ├── file1.js
  ├── file2.js
  ├── file3.js        (confusing - too many files in one folder)
  └── file4.js
```

---

## Testing Your Code Before Pushing

**Checklist:**
- [ ] `npm run dev` starts without errors
- [ ] All endpoints respond
- [ ] Test in Postman (POST, GET, etc.)
- [ ] Input validation works
- [ ] No `console.log()` left for debugging
- [ ] Error messages make sense

---

## Code Quality Tips

✅ **Good Code:**
```javascript
// Clear function names
exports.getUserById = (req, res) => {
  const userId = req.params.id;
  
  if (!userId) {
    return res.status(400).json({ error: "User ID required" });
  }
  
  // Get user logic
};
```

❌ **Bad Code:**
```javascript
// Unclear function names
exports.get = (req, res) => {
  let x = req.params.id;
  // Get user logic
};
```

---

**Remember:** Code is read more often than it's written. Write clear, simple code!
