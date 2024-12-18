import {  DataTypes } from 'sequelize';
import sequelize from './db.js'; 
import Role from './Role.js';

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

  
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role, 
      key: 'id',
    },
    validate: {
      notNull: { msg: 'Role ID is required' },
    },
  },
}, {
  
  tableName: 'users',  
  timestamps: true,     
});

User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
Role.hasMany(User, { foreignKey: 'roleId' });

export default User;
