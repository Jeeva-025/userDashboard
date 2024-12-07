
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config(); 


const sequelize = new Sequelize(
  process.env.DB_NAME,    
  process.env.DB_USER,    
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST, 
    dialect: process.env.DB_DIALECT, 
    port: process.env.DB_PORT, 
    logging: false,
  }
);


export const testSequelizeConnection = async () => {
  try {
    await sequelize.authenticate(); 
    console.log('Connection  established successfully.');
  } catch (error) {
    console.error('Unable connect database:', error);
  }
};


export default sequelize;
