// In-memory task storage (for demonstration)
// In production, use MongoDB/PostgreSQL

let tasks = [
  { id: 1, title: "Learn Node.js", completed: false, userId: 1, category: "Learning", priority: "medium", tags: ["backend", "javascript"] },
  { id: 2, title: "Build API", completed: false, userId: 1, category: "Development", priority: "high", tags: ["api", "express"] }
];

let nextId = 3;

// Available categories
const CATEGORIES = ["Learning", "Development", "Design", "Testing", "Deployment", "Documentation"];
const PRIORITIES = ["low", "medium", "high", "urgent"];

class TaskModel {
  static getAllTasks() {
    return tasks;
  }

  static getTaskById(id) {
    return tasks.find(t => t.id === id);
  }

  static getTasksByUser(userId) {
    return tasks.filter(t => t.userId === userId);
  }

  static getTasksByCategory(category) {
    return tasks.filter(t => t.category === category);
  }

  static getTasksByPriority(priority) {
    return tasks.filter(t => t.priority === priority);
  }

  static getTasksByTag(tag) {
    return tasks.filter(t => t.tags && t.tags.includes(tag));
  }

  static createTask(title, userId, category = "General", priority = "medium", tags = []) {
    const newTask = {
      id: nextId++,
      title,
      completed: false,
      userId,
      category: CATEGORIES.includes(category) ? category : "General",
      priority: PRIORITIES.includes(priority) ? priority : "medium",
      tags: Array.isArray(tags) ? tags : [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    tasks.push(newTask);
    return newTask;
  }

  static updateTask(id, updates) {
    const task = tasks.find(t => t.id === id);
    if (!task) return null;
    
    // Validate category if provided
    if (updates.category && !CATEGORIES.includes(updates.category)) {
      updates.category = "General";
    }
    
    // Validate priority if provided
    if (updates.priority && !PRIORITIES.includes(updates.priority)) {
      updates.priority = "medium";
    }
    
    Object.assign(task, updates, { updatedAt: new Date() });
    return task;
  }

  static deleteTask(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  }

  static getCategories() {
    return CATEGORIES;
  }

  static getPriorities() {
    return PRIORITIES;
  }

  static getTaskStats() {
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.completed).length,
      pending: tasks.filter(t => !t.completed).length,
      byCategory: CATEGORIES.reduce((acc, cat) => {
        acc[cat] = tasks.filter(t => t.category === cat).length;
        return acc;
      }, {}),
      byPriority: PRIORITIES.reduce((acc, pri) => {
        acc[pri] = tasks.filter(t => t.priority === pri).length;
        return acc;
      }, {})
    };
  }
}

module.exports = TaskModel;
