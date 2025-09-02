

import {Router} from 'express';
import { taskControllers } from '../modules/task/task.controllers.js';
import { authentication } from '../middlewares/authentication.middleware.js';


const taskRouter = Router();



taskRouter.post('/',authentication('CLIENT'),taskControllers.createTaskController);




export default taskRouter;