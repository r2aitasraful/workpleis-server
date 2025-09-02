import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { authServices } from "./auth.services.js";


const authLoginController = asyncHandler(async(req , res)=>{
    const user = await authServices.authLoginService(req.body);

    sendResponse(res,{
        statusCode : 200,
        success : true,
        message : 'User logged in successful',
        data : user
    });
})
export const authControllers ={
    authLoginController
}