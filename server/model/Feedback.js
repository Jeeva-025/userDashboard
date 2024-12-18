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
  platforms: {
    type: DataTypes.JSON,  // Array of platform IDs
    allowNull: true,
  },
  modules: {
    type: DataTypes.JSON,  // Array of module IDs
    allowNull: true,
  },
  tags: {
    type: DataTypes.JSON,  // Array of tag IDs
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: "feedbacks",
});

export default Feedback;
