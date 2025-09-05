import {Router} from 'express';
import upload from '../config/multer.config.js';
import { authentication } from '../middlewares/authentication.middleware.js';
import { verificationControllers } from '../modules/verification/verification.controllers.js';

const verificationRouter = Router();



verificationRouter.post('/indentity',authentication('CLIENT'),upload.fields([{ name: "frontImage", maxCount: 1 }, { name: "backImage", maxCount: 1 }]),verificationControllers.verifyIdentityVerificationController);



export default verificationRouter;