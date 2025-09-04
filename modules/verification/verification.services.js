import AppError from "../../utils/appError.js";
import { generateVerificationCodeAndExpires } from "../../utils/generateCodeExpires.js";
import User from "../user/user.model.js";




// email verification starts here


// send email verification code 
const sendEmailVerificationCodeService = async (userId) => {
  const user = await User.findById(userId);
  if (user.isVerifiedEmail) {
    throw new AppError(400, "Email already verified");
  }

  const {code,expiresAt} = generateVerificationCodeAndExpires();
 

  user.emailVerificationCode = code;
  user.emailVerificationExpires = expiresAt;

  await user.save()

   // here verification data will send on email 

  return {email : user.email,verificationCode : code}
};

// verify email verification code 
const verifyEmailVerificationCodeService = async (userId, code) => {
    const user = await User.findById(userId);
  if (!user) {
    throw new AppError(400, "User not found");
}
  if (user.emailVerificationCode !== code) {
    throw new AppError(400, "Invalid code");
}
  if (user.emailVerificationExpires < Date.now()) {
    throw new AppError(400, "Code expired");
}


    user.isVerifiedEmail = true;
    user.emailVerificationCode = '';
    user.emailVerificationExpires = '';
    await user.save();

  return user;
};
// email verification ends here



// mobile phone verification starts here
// const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

//send phone verification code 
const sendPhoneVerificationCodeService = async (userId, phoneNumber) => {
    if(!phoneNumber){
        throw new AppError(400, "Phone number is required for phone number verification.");
    }
    const user = await User.findById(userId);
  if (user.isVerifiedPhone) {
    throw new AppError(400, "Phone already verified");
}

  const {code,expiresAt} = generateVerificationCodeAndExpires();
 
  user.phoneNumber = phoneNumber;
  user.phoneVerificationCode = code;
  user.phoneVerificationExpires = expiresAt;

  await user.save();

  
  return {phone : phoneNumber, verificationCode : code};
};

// verify verification phone number
const verifyPhoneVerificationCodeService = async (userId, code) => {
    const user = await User.findById(userId);
  if (!user) {
    throw new AppError(400, "User not found");
}
  if (user.phoneVerificationCode !== code) {
    throw new AppError(400, "Invalid code");
}
  if (user.phoneVerificationExpires < Date.now()) {
    throw new AppError(400, "Code expired");
}


    user.isVerifiedPhone = true;
    user.phoneVerificationCode = '';
    user.phoneVerificationExpires = '';
    await user.save();


// here is send verification on mobile phone

    return user;
};

// mobile phone verification ends here



export const verificationServices = {
    sendEmailVerificationCodeService,
    verifyEmailVerificationCodeService,
    sendPhoneVerificationCodeService,
    verifyPhoneVerificationCodeService
}