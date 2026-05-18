const express = require("express");
const taskController = require("../controllers/taskController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);

// Protected routes (require JWT token)
router.post("/", authenticateToken, taskController.createTask);
router.put("/:id", authenticateToken, taskController.updateTask);
router.delete("/:id", authenticateToken, taskController.deleteTask);

module.exports = router;
