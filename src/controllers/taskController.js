const TaskModel = require("../models/taskModel");

// GET all tasks with optional filters
exports.getAllTasks = (req, res) => {
  try {
    const { category, priority, tag } = req.query;
    let tasks = TaskModel.getAllTasks();

    if (category) {
      tasks = tasks.filter(t => t.category === category);
    }
    if (priority) {
      tasks = tasks.filter(t => t.priority === priority);
    }
    if (tag) {
      tasks = tasks.filter(t => t.tags && t.tags.includes(tag));
    }

    res.json({ success: true, data: tasks, count: tasks.length });
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

// CREATE new task with category, priority, and tags
exports.createTask = (req, res) => {
  try {
    const { title, category, priority, tags } = req.body;
    
    // SECURITY: Validate input
    if (!title || typeof title !== "string") {
      return res.status(400).json({ success: false, error: "Invalid title" });
    }

    if (title.length < 3 || title.length > 100) {
      return res.status(400).json({ success: false, error: "Title must be 3-100 characters" });
    }

    const userId = req.user?.id || 1; // Get from JWT token
    const newTask = TaskModel.createTask(title, userId, category, priority, tags);
    
    res.status(201).json({ success: true, data: newTask, message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// UPDATE task
exports.updateTask = (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed, category, priority, tags } = req.body;
    
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
    if (category !== undefined) {
      updates.category = category;
    }
    if (priority !== undefined) {
      updates.priority = priority;
    }
    if (tags !== undefined) {
      updates.tags = tags;
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

// GET task statistics
exports.getTaskStats = (req, res) => {
  try {
    const stats = TaskModel.getTaskStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET available categories
exports.getCategories = (req, res) => {
  try {
    const categories = TaskModel.getCategories();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET available priorities
exports.getPriorities = (req, res) => {
  try {
    const priorities = TaskModel.getPriorities();
    res.json({ success: true, data: priorities });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
