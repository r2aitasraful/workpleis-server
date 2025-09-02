
import express from 'express';
import cors from 'cors';
import { globalErrorHandle } from './utils/globalErrorHandler.js';
import { notFoundHandler } from './utils/notFoundRoute.js';
import userRouter from './routes/user.router.js';



const app  = express();

app.use(express.json())
app.use(cors())

app.use('/api/v1/user',userRouter);

// app.get('/',(req,res)=>{
//     res.send('hello world')
// })

 
app.use(globalErrorHandle);

app.use(notFoundHandler);

export default app;