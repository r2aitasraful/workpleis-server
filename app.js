
import express from 'express';
import { globalErrorHandle } from './utils/globalErrorHandler';
import { notFoundHandler } from './utils/notFoundRoute';

const app  = express();

app.use(express.json())
app.use(cors())

app.use('/api/v1',router);


app.use(globalErrorHandle);

app.use(notFoundHandler);

export default app;