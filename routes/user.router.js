

import {Router} from 'express';


const userRouter = Router();



userRouter.get('/',(req,res)=>{
    res.send('hello i am a user')
})



export default userRouter;