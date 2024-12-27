import { DataTypes } from "sequelize";
import sequelize from "./db.js";
import Auth from "./Auth.js";



const Project=sequelize.define("Project",{

  id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
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

  userid:{
    type:DataTypes.INTEGER,
    allowNull: false,
    references:{
        model:Auth,
        key:'id',
    }
  },

  role:{
    type:DataTypes.STRING,
    allowNull:false
  },
   status:{
    type:DataTypes.STRING,
    
    defaultValue: "Active",
    allowNull:false,
   },


},{
    tableName:"projects",
    timestamps:true,
})


export default Project;