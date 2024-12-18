import { DataTypes } from "sequelize";
import sequelize from "./db.js";
import Feedback from "./Feedback.js";

const Platform = sequelize.define("Platform",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true, 
        allowNull:false,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
                                   
},{

    tableName:"platforms",
    timestamps:true
});



export default Platform;
