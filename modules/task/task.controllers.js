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
const getAllTasksController = asyncHandler(async (req, res) => {
  const tasks = await taskServices.getAllTasksService();
   sendResponse(res,{
           statusCode : 200,
           success : true,
           message : 'All tasks retrived',
           data : tasks
       });
});

// // Get task details
const getTaskByIdController = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const task = await taskServices.getTaskByIdService(taskId);
  sendResponse(res,{
           statusCode : 200,
           success : true,
           message : 'Task retrived',
           data : task
       });
});

// Update task
const updateTaskController = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const clientId = req.user.id;
    const task = await taskServices.updateTaskService(taskId, req.body,clientId);
    sendResponse(res,{
           statusCode : 200,
           success : true,
           message : 'Task updated',
           data : task
       });
});

// Delete task
const deleteTaskController = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const clientId = req.user.id
    await taskServices.deleteTaskService(taskId,clientId );
    sendResponse(res,{
           statusCode : 200,
           success : true,
           message : 'Task Deleted',
       });
});

// Get all tasks created by a specific client
const getTasksByClientController = asyncHandler(async (req, res, next) => {
    const clirntId = req.params.id;
  const tasks = await taskServices.getTasksByClientService(clirntId);

  sendResponse(res,{
           statusCode : 200,
           success : true,
           message : 'Task Deleted',
           data: {count: tasks.length,tasks},
       });
});


export const taskControllers ={
    createTaskController,
    getAllTasksController,
    getTaskByIdController,
    updateTaskController,
    deleteTaskController,
    getTasksByClientController
    
}
 