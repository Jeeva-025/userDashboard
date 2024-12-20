import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Feedback = sequelize.define("Feedback", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  filename: {
    type: DataTypes.STRING,  // Optional field
    allowNull: true,
  },
  vote: {
    type: DataTypes.INTEGER,  // Default value of 0
    allowNull: false,
    defaultValue: 0,
  },
}, {
  timestamps: true,
  tableName: "feedbacks",
});

export default Feedback;