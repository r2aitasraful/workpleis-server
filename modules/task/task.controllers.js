import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { taskServices } from "./task.services.js";


// Create new task
const createTaskController = asyncHandler(async (req, res) => {
  const clientId = req.user.id;
  const task = await taskServices.createTaskService(req.body, clientId);
   sendResponse(res,{
           statusCode : 201,
           success : true,
           message : 'Task created',
           data : task
       });
});

// Get all tasks
// export const getAllTasks = catchAsync(async (req, res, next) => {
//   const tasks = await taskService.getAllTasks();
//   res.status(200).json({ success: true, data: tasks });
// });

// // Get task details
// export const getTaskById = catchAsync(async (req, res, next) => {
//   const task = await taskService.getTaskById(req.params.id);
//   res.status(200).json({ success: true, data: task });
// });

// // Update task
// export const updateTask = catchAsync(async (req, res, next) => {
//   const task = await taskService.updateTask(req.params.id, req.body, req.user.id);
//   res.status(200).json({ success: true, data: task });
// });

// // Delete task
// export const deleteTask = catchAsync(async (req, res, next) => {
//   await taskService.deleteTask(req.params.id, req.user.id);
//   res.status(204).json({ success: true, message: "Task deleted" });
// });


export const taskControllers ={
    createTaskController
}
 