import AppError from "../../utils/appError.js";
import Offer from "../offer/offer.model.js";
import Task from "./task.model.js";


// Create new task
const createTaskService =async(payload,userId)=>{
    const task = await Task.create({ ...payload, createdBy: userId });
    return task;
}

// Get all tasks
const getAllTasksService = async () => {
  const tasks = await Task.find().populate("createdBy", "name email");
  return tasks;
};

// Get single task by ID
const getTaskByIdService = async (taskId) => {
  const task = await Task.findById(taskId)
    .populate("createdBy", "name email");

  if (!task) throw new AppError(404,"Task not found");

  const applicants = await Offer.find({task : taskId}).countDocuments();
   
  return {task, applicants};
};

// Update a task (only owner can update)
const updateTaskService = async (taskId, payload, userId) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, createdBy: userId },  
    payload,
    { new: true, runValidators: true }
  );

  if (!task) throw new AppError(404,"Task not found");
  return task;
};

// Delete a task (only owner can delete)
const deleteTaskService = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, createdBy: userId });

  if (!task) throw new AppError(404,"Task not found or not authorized");
  return task;
};

// Get all tasks created by a specific client
const getTasksByClientService = async (clientId) => {
  const tasks = await Task.find({ createdBy: clientId })
    .populate("assignedTo", "name email");
    return tasks;
};



export const taskServices = {
    createTaskService,
    getAllTasksService,
    getTaskByIdService,
    updateTaskService,
    deleteTaskService,
    getTasksByClientService
}