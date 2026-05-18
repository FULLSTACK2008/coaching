const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const users = [
  {
    id: 1,
    username: "admin",
    password: "$2b$10$somethinghashed"
  }
];

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const exists = users.find(u => u.username === username);
    if (exists) {
      return res.status(400).json({ error: "User exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    users.push({
      id: users.length + 1,
      username,
      password: hashed
    });

    res.json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, username: user.username },
    "secret123",
    { expiresIn: "1h" }
  );

  res.json({ token });
});

module.exports = router;