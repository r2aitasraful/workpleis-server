import dotenv from 'dotenv';
dotenv.config();


const envsLoading = ()  =>{
     const properties  = ['MONGODB_URL',
        'PORT','NODE_ENV','JWT_ACCESS_TOKEN_SECRET','JWT_ACCESS_TOKEN_EXPIRESIN','BCRYPT_SALT'];

     properties.forEach((key)=>{
        if(!process.env[key]){
            throw new Error (`Missing env variable ${key}`)
        }
     })
    
     return {
            PORT,
            MONGODB_URL ,
            NODE_ENV ,
            JWT_ACCESS_TOKEN_SECRET ,
            JWT_ACCESS_TOKEN_EXPIRESIN,
            BCRYPT_SALT
        }
}



export const envLoader  = envsLoading();