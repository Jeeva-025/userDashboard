import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Auth= sequelize.define("Auth",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        validate: {
            notNull: { msg: 'Username is required' },  
            notEmpty: { msg: 'Username cannot be empty' }  
          }

    },

    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true,  
        validate: {
            notNull: { msg: 'email is required' },  
            notEmpty: { msg: 'email cannot be empty' }  
          }
    },

    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate: {
            notNull: { msg: 'password is required' },  
            notEmpty: { msg: 'password cannot be empty' }  
          }

    }
},
{
    tableName: 'auths',  
    timestamps: true,     
  })

  export default Auth;