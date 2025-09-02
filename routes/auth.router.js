

import {Router} from 'express';
import { authControllers } from '../modules/auth/auth.controllers';


const authRouter = Router();



authRouter.post('/login',authControllers.authLoginController);



export default authRouter;