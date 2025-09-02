import AppError from "../../utils/appError.js";
import Task from "./task.model.js";



const createTaskService =async(payload,userId)=>{
    const task = await Task.create({ ...payload, createdBy: userId });
    return task;
}


// Get all tasks
const getAllTasks = async () => {
  const tasks = await Task.find().populate("createdBy", "name email");
  return tasks;
};

// Get single task by ID
const getTaskById = async (taskId) => {
  const task = await Task.findById(taskId)
    .populate("createdBy", "name email")
    .populate("assignedTo", "name email");

  if (!task) throw new AppError("Task not found", 404);
  return task;
};

// Update a task (only owner can update)
const updateTask = async (taskId, updates, userId) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, createdBy: userId },  
    updates,
    { new: true, runValidators: true }
  );

  if (!task) throw new AppError("Task not found", 404);
  return task;
};

// Delete a task (only owner can delete)
const deleteTask = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, createdBy: userId });

  if (!task) throw new AppError("Task not found or not authorized", 404);
  return task;
};



export const taskServices ={
    createTaskService
}