const express = require("express");
const taskController = require("../controllers/taskController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes - specific routes first to avoid conflicts
router.get("/stats/overview", taskController.getTaskStats);
router.get("/meta/categories", taskController.getCategories);
router.get("/meta/priorities", taskController.getPriorities);
router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);

// Protected routes (require JWT token)
router.post("/", authenticateToken, taskController.createTask);
router.put("/:id", authenticateToken, taskController.updateTask);
router.delete("/:id", authenticateToken, taskController.deleteTask);

module.exports = router;
