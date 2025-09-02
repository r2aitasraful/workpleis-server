

import {Router} from 'express';
import { userControllers } from '../modules/user/user.controllers.js';


const userRouter = Router();



userRouter.post('/register',userControllers.createUser);



export default userRouter;