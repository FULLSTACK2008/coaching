const TaskModel = require("../models/taskModel");

// Admin Dashboard Analytics
exports.getDashboardStats = (req, res) => {
  try {
    const tasks = TaskModel.getAllTasks();
    
    const stats = {
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.completed).length,
      pendingTasks: tasks.filter(t => !t.completed).length,
      completionRate: tasks.length > 0 
        ? ((tasks.filter(t => t.completed).length / tasks.length) * 100).toFixed(2) 
        : 0,
      totalUsers: 3, // Mock data - in production, use actual user count
      activeUsers: 2
    };
    
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all users (admin only)
exports.getAllUsers = (req, res) => {
  try {
    // Mock user data - in production, fetch from database
    const users = [
      { id: 1, username: "admin", role: "admin", createdAt: "2026-01-01" },
      { id: 2, username: "user1", role: "user", createdAt: "2026-01-15" },
      { id: 3, username: "user2", role: "user", createdAt: "2026-02-01" }
    ];
    
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get user by ID (admin only)
exports.getUserById = (req, res) => {
  try {
    const { id } = req.params;
    
    // Mock user data
    const user = {
      id: parseInt(id),
      username: `user${id}`,
      role: id === "1" ? "admin" : "user",
      createdAt: "2026-01-01",
      taskCount: TaskModel.getTasksByUser(parseInt(id)).length
    };
    
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete user (admin only)
exports.deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    
    // In production, delete from database and associated tasks
    // For now, return success message
    res.json({ success: true, message: `User ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get system activity logs
exports.getActivityLogs = (req, res) => {
  try {
    // Mock activity logs
    const logs = [
      { id: 1, action: "user_login", userId: 1, timestamp: "2026-05-19T06:00:00Z" },
      { id: 2, action: "task_created", userId: 2, timestamp: "2026-05-19T06:30:00Z" },
      { id: 3, action: "task_completed", userId: 2, timestamp: "2026-05-19T07:00:00Z" },
      { id: 4, action: "user_registered", userId: 3, timestamp: "2026-05-19T07:30:00Z" }
    ];
    
    res.json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
