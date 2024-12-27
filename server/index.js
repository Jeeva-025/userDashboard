import express, { urlencoded } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { testSequelizeConnection } from "./model/db.js";
import UserRouter from './route/User.js';
import sequelize from "./model/db.js";
import TaskRouter from "./route/Task.js";
import User from "./model/User.js";
import Role from "./model/Role.js";
import Task from "./model/Task.js";
import Project from './model/Project.js';
import Platform from "./model/Platform.js";
import Feedback from "./model/Feedback.js";
import Tag from "./model/Tag.js";
import Module from "./model/Module.js";
import "./model/association.js";
import FeedbackRouter from "./route/Feedback.js";
import ProjectRouter from "./route/Project.js"
const app=express();

dotenv.config();
app.use(cors({origin:true, credentials:true}));
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true}));


sequelize.sync()
  .then(() => console.log('Database synced.'))
  .catch(error => console.error('Error syncing database:', error));



  app.use("/api/user",UserRouter)
  app.use("/api/feedback", FeedbackRouter)
  
  app.use("/api/project", ProjectRouter )
  app.use("/api/task", TaskRouter )
  

const startServer=async()=>{
    try{
       
       testSequelizeConnection();
        app.listen(8080, ()=> console.log("server is started"))
    }catch(err){
        console.log(err.message);
    }
}

startServer();
