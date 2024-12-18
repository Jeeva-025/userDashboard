import { DataTypes } from "sequelize";
import sequelize from "./db.js";
import Feedback from "./Feedback.js";

const Tag= sequelize.define("Tag", {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:true,
    tableName:'tags'
});



export default Tag;