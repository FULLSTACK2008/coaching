const TaskModel = require("../models/taskModel");

// GET all tasks
exports.getAllTasks = (req, res) => {
  try {
    const tasks = TaskModel.getAllTasks();
    res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET task by ID
exports.getTaskById = (req, res) => {
  try {
    const { id } = req.params;
    const task = TaskModel.getTaskById(parseInt(id));
    
    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }
    
    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// CREATE new task
exports.createTask = (req, res) => {
  try {
    const { title } = req.body;
    
    // SECURITY: Validate input
    if (!title || typeof title !== "string") {
      return res.status(400).json({ success: false, error: "Invalid title" });
    }

    if (title.length < 3 || title.length > 100) {
      return res.status(400).json({ success: false, error: "Title must be 3-100 characters" });
    }

    const userId = req.user?.id || 1; // Get from JWT token
    const newTask = TaskModel.createTask(title, userId);
    
    res.status(201).json({ success: true, data: newTask, message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// UPDATE task
exports.updateTask = (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    
    const task = TaskModel.getTaskById(parseInt(id));
    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }

    const updates = {};
    if (title !== undefined) {
      if (typeof title !== "string" || title.length < 3) {
        return res.status(400).json({ success: false, error: "Invalid title" });
      }
      updates.title = title;
    }
    if (completed !== undefined) {
      updates.completed = Boolean(completed);
    }

    const updatedTask = TaskModel.updateTask(parseInt(id), updates);
    res.json({ success: true, data: updatedTask, message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE task
exports.deleteTask = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = TaskModel.deleteTask(parseInt(id));
    
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }

    res.json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
