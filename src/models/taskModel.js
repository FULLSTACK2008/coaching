// In-memory task storage (for demonstration)
// In production, use MongoDB/PostgreSQL

let tasks = [
  { id: 1, title: "Learn Node.js", completed: false, userId: 1 },
  { id: 2, title: "Build API", completed: false, userId: 1 }
];

let nextId = 3;

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

  static createTask(title, userId) {
    const newTask = {
      id: nextId++,
      title,
      completed: false,
      userId,
      createdAt: new Date()
    };
    tasks.push(newTask);
    return newTask;
  }

  static updateTask(id, updates) {
    const task = tasks.find(t => t.id === id);
    if (!task) return null;
    Object.assign(task, updates);
    return task;
  }

  static deleteTask(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  }
}

module.exports = TaskModel;
