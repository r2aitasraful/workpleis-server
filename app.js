
import express from 'express';
import cors from 'cors';
import { globalErrorHandle } from './utils/globalErrorHandler.js';
import { notFoundHandler } from './utils/notFoundRoute.js';
import userRouter from './routes/user.router.js';
import authRouter from './routes/auth.router.js';
import taskRouter from './routes/task.router.js';
import offerRouter from './routes/offer.router.js';
import reviewRouter from './routes/review.router.js';
import forgotPasswordRouter from './routes/forgotPassword.router.js';



const app  = express();

app.use(express.json())
app.use(cors())

app.use('/api/v1/user',userRouter);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/tasks',taskRouter);
app.use('/api/v1/offers',offerRouter);
app.use('/api/v1/reviews',reviewRouter);
app.use('/api/v1/forgot/password',forgotPasswordRouter);

// app.get('/',(req,res)=>{
//     res.send('hello world')
// })

 
app.use(globalErrorHandle);

app.use(notFoundHandler);

export default app;