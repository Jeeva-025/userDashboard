import { Sequelize, DataTypes } from 'sequelize';
import sequelize from './db.js'; 

const User = sequelize.define('User', {
  
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,   
    autoIncrement: true, 
    allowNull: false,    
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,  
    validate: {
      notNull: { msg: 'Username is required' },  
      notEmpty: { msg: 'Username cannot be empty' }  
    }
  },

  
  email: {
    type: DataTypes.STRING,
    allowNull: false,  
    unique: true,  
    validate: {
      notNull: { msg: 'Email is required' },  
      isEmail: { msg: 'Must be a valid email' },  
      notEmpty: { msg: 'Email cannot be empty' }  
    }
  },

  
  role: {
    type: DataTypes.STRING,
    allowNull: false,  
    validate: {
      notNull: { msg: 'Role is required' },  
      notEmpty: { msg: 'Role cannot be empty' }  
    }
  }
}, {
  
  tableName: 'users',  
  timestamps: true,     
});

export default User;
