

import {Router} from 'express';
import { taskControllers } from '../modules/task/task.controllers.js';
import { authentication } from '../middlewares/authentication.middleware.js';


const offerRouter = Router();



offerRouter.post('/',authentication('CLIENT'),taskControllers.createTaskController);
offerRouter.get('/',authentication('CLIENT','JOB_SEEKER','ADMIN'),taskControllers.getAllTasksController);
offerRouter.get('/:id',authentication('CLIENT','JOB_SEEKER','ADMIN'),taskControllers.getTaskByIdController);
offerRouter.put('/:id',authentication('CLIENT'),taskControllers.updateTaskController);
offerRouter.delete('/:id',authentication('CLIENT','ADMIN'),taskControllers.deleteTaskController);
offerRouter.get('/client/:id',authentication('CLIENT'),taskControllers.getTasksByClientController);




export default offerRouter;