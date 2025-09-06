import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { userServices } from "./user.services.js";


const createUser = asyncHandler(async(req , res)=>{
    const user = await userServices.createUserService(req.body);

    sendResponse(res,{
        statusCode : 201,
        success : true,
        message : 'User created',
        data : user
    });
})


export const userControllers = {
    createUser
} 