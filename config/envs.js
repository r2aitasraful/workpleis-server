import dotenv from 'dotenv';
dotenv.config();




const envsLoading = ()  =>{
       
     const properties  = ['MONGODB_URL','PORT','NODE_ENV','JWT_ACCESS_TOKEN_SECRET','JWT_ACCESS_TOKEN_EXPIRESIN','BCRYPT_SALT'];

     properties.forEach((key)=>{
        if(!process.env[key]){
            throw new Error (`Missing env variable ${key}`)
        }
     })
    
     return {
            PORT : process.env.PORT,
            MONGODB_URL : process.env.MONGODB_URL ,
            NODE_ENV : process.env.NODE_ENV ,
            JWT_ACCESS_TOKEN_SECRET : process.env.JWT_ACCESS_TOKEN_SECRET,
            JWT_ACCESS_TOKEN_EXPIRESIN : process.env.JWT_ACCESS_TOKEN_EXPIRESIN,
            BCRYPT_SALT : process.env.BCRYPT_SALT
        }
}



export const envLoader  = envsLoading();