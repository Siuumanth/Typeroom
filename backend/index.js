import dotenv from 'dotenv';
dotenv.config();

import { app } from "./app.js";
import connectDB from './config/connectDB.js';

//importing .env

// app is the base of Asobi

console.log("Loaded MONGO_URL:", process.env.MONGO_URL);


const PORT = process.env.PORT || 6000

//app starts listening only after database connected
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log("Server is runnning on port",PORT)
    }) 
})
.catch((err) => {
    console.log("mongo connection error", err)
})

