import mongoose from "mongoose";
import { envLoader } from "./config/envs.js";
import app from "./app.js";



let server;

const initServer = async()=>{
    try {
        await mongoose.connect(envLoader.MONGODB_URL);
        server = app.listen(envLoader.PORT,()=>{
            console.log(`Server is running at ${envLoader.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
} 
 
initServer();

process.on("unhandledRejection",(err)=>{
    console.log('unhandledRejection',err);

    if(server){
        server.close(()=>{
            process.exit(1);
        })
    }
    process.exit(1);
})


process.on("uncaughtException",(err)=>{
    console.log('uncaughtException', err);

    if(server){
        server.close(()=>{
            process.exit(1);
        })
    }
    process.exit(1);
})

process.on('SIGTERM',()=>{
    console.log('SIGTERM error');

    if(server){
        server.close(()=>{
            process.exit(1);
        })
    }
    process.exit(1);
})

process.on('SIGINT',()=>{
    console.log('SIGINT : Stop the server gracefully...');
    
    if(server){
        server.close(()=>{
            process.exit(1);
        })
    }
    process.exit(1);

})