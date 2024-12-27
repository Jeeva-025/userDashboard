import { DataTypes } from "sequelize";;
import sequelize from "./db.js";
import Project from './Project.js';
import Auth from "./Auth.js";





const Task=sequelize.define("Task",{

  id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
  },
  projectid:{
    type:DataTypes.INTEGER,
    allowNull:false,
    references:{
        model:Project,
        key:'id'
    }
  },
  assignerid:{
    type:DataTypes.INTEGER,
     allowNull:false,
     references:{
        model:Auth,
        key:'id'
     }
  },

  assigneeid:{
    type:DataTypes.INTEGER,
    allowNull:false,
    references:{
        model:Auth,
        key:'id'
    }
  },

  title:{
   type:DataTypes.STRING,
   allowNull:false,
  },

  type:{
    type:DataTypes.STRING,
    allowNull:false
  },

  description:{
    type:DataTypes.TEXT,
    allowNull:false
  },

  startDate:{
    type:DataTypes.DATE,
    allowNull:false
  },

  endDate:{
    type:DataTypes.DATE,
    allowNull:false
  },

  

  role:{
    type:DataTypes.STRING,
    allowNull:false
  },
   status:{
    type:DataTypes.STRING,
    allowNull:false,
    defaultValue:"Active"
   }


},{
    tableName:"tasks",
    timestamps:true,
})


export default Task;