import { log } from 'console';
import mongoose, { Schema, model, connect, Connection } from 'mongoose';

let isConnected:Connection | boolean = false;
export const connectDB = async () =>{
    if(isConnected){
        return isConnected;
        console.log("Already Connected");
        
    }
    else{

    
    try {
        const res = await mongoose.connect(process.env.MONGO_URI!);
        isConnected = res.connection;
        console.log("Db Connected");
        return isConnected;
        

    } catch (error) {
        console.log(error);
        
    }
}
}