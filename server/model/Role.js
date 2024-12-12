import { DataTypes } from 'sequelize';
import sequelize from './db.js';

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: { msg: 'Role is required' },
      notEmpty: { msg: 'Role cannot be empty' },
      isIn: {
        args: [['Admin', 'Member']], 
        msg: 'Role must be either admin or member',
      },
    },
  },
}, {
  tableName: 'roles',
  timestamps: true, 
});

export default Role;
