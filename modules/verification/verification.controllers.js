import { asyncHandler } from "../../utils/asyncHandler.js"
import { sendResponse } from "../../utils/sendResponse";
import { verificationServices } from "./verification.services.js";


// send email verification code 
const sendEmailVerificationCodeController =asyncHandler(async(req,res)=>{
    const userId = req.user.id;

    const data = await verificationServices.sendEmailVerificationCodeService(userId);
    sendResponse(res,{
            statusCode : 200,
            success : true,
            message : 'Email verification code send successful',
            data : data
        }); 
});


// verify email verification
const verifyEmailVerificationController =asyncHandler(async(req,res)=>{
    const userId = req.user.id;
    const verificationCode = req.params.code;

    const data = await verificationServices.verifyEmailVerificationCodeService(userId,verificationCode);
    sendResponse(res,{
            statusCode : 200,
            success : true,
            message : 'Email verified successfully',
            data : data
        }); 
});


// send phone number verification code 
const sendPhoneVerificationCodeController =asyncHandler(async(req,res)=>{
    const userId = req.user.id;
    const {phoneNumber} = req.body;

    const data = await verificationServices.sendPhoneVerificationCodeService(userId,phoneNumber);
    sendResponse(res,{
            statusCode : 200,
            success : true,
            message : 'Phone number verification code send successful',
            data : data
        }); 
});


// verify phone number verification
const verifyPhoneNumberVerificationController =asyncHandler(async(req,res)=>{
    const userId = req.user.id;
    const verificationCode = req.params.code;

    const data = await verificationServices.verifyPhoneVerificationCodeService(userId,verificationCode);
    sendResponse(res,{
            statusCode : 200,
            success : true,
            message : 'Phone number verified successfully',
            data : data
        }); 
});







export const verificationControllers = {
    sendEmailVerificationCodeController,
    verifyEmailVerificationController,
    sendPhoneVerificationCodeController
}