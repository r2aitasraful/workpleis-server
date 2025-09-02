

import {Router} from 'express';
import { taskControllers } from '../modules/task/task.controllers.js';
import { authentication } from '../middlewares/authentication.middleware.js';


const taskRouter = Router();



taskRouter.post('/',authentication('CLIENT'),taskControllers.createTaskController);
taskRouter.get('/',authentication('CLIENT','JOB_SEEKER','ADMIN'),taskControllers.getAllTasksController);
taskRouter.get('/:id',authentication('CLIENT','JOB_SEEKER','ADMIN'),taskControllers.getTaskByIdController);
taskRouter.put('/:id',authentication('CLIENT'),taskControllers.updateTaskController);
taskRouter.delete('/:id',authentication('CLIENT','ADMIN'),taskControllers.deleteTaskController);
taskRouter.get('/client/:id',authentication('CLIENT'),taskControllers.getTasksByClientController);




export default taskRouter;