const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticateToken } = require("../middleware/authMiddleware");

// Admin middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (req.user?.username !== "admin") {
    return res.status(403).json({ success: false, error: "Admin access required" });
  }
  next();
};

// All admin routes require authentication and admin role
router.get("/dashboard", authenticateToken, requireAdmin, adminController.getDashboardStats);
router.get("/users", authenticateToken, requireAdmin, adminController.getAllUsers);
router.get("/users/:id", authenticateToken, requireAdmin, adminController.getUserById);
router.delete("/users/:id", authenticateToken, requireAdmin, adminController.deleteUser);
router.get("/activity-logs", authenticateToken, requireAdmin, adminController.getActivityLogs);

module.exports = router;
