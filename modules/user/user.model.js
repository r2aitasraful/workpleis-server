import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      minlength: 6,
      required : function(){
            return !this.isGoogle;
     }, 
    },
    role: {
      type: String,
      enum: ["CLIENT", "JOB_SEEKER", "ADMIN"],
      default: "JOB_SEEKER",
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    ratings: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    identityDoc: {
      type: String,  
    },
    isGoogle: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey : false }
);



const User = mongoose.model("User", userSchema);

export default User;