import bcrypt from 'bcryptjs';
import User from "../user/user.model.js";
import AppError from '../../utils/appError.js';
import { envLoader } from '../../config/envs.js';
import { generateToken } from '../../utils/generateToken.js';


const authLoginService = async(payload)=>{
    const {email,password}= payload;

    const isUserExist = await User.findOne({email});

    if(!isUserExist){ 
        throw new AppError(404,"User is not found.");
    }

    const isCorrectPassword = await bcrypt.compare(password,isUserExist.password);
   
    if(!isCorrectPassword){ 
        throw new AppError(401,"Incorrect password.");
    }

    const tokenPayload = {
        id : isUserExist._id,
        email : isUserExist.email,
        role : isUserExist.role
    }
    const token = generateToken(tokenPayload,envLoader.JWT_ACCESS_TOKEN_SECRET,envLoader.JWT_ACCESS_TOKEN_EXPIRESIN)

    return {
        token
    };
}


export const authServices = {
    authLoginService
}