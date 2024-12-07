import express, { urlencoded } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { testSequelizeConnection } from "./model/db.js";
import UserRouter from './route/User.js';
import sequelize from "./model/db.js";
import User from "./model/User.js";
const app=express();

dotenv.config();
app.use(cors({origin:true, credentials:true}));
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true}));


sequelize.sync()
  .then(() => console.log('Database synced.'))
  .catch(error => console.error('Error syncing database:', error));



  app.use("/api/user",UserRouter)
  

const startServer=async()=>{
    try{
       
       testSequelizeConnection();
        app.listen(8080, ()=> console.log("server is started"))
    }catch(err){
        console.log(err.message);
    }
}

startServer();
