require('dotenv').config();

const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV;
const sequelize = new Sequelize('mysql://root:@localhost:3306/todolist_react_node');

const testConnexion = async () => {
  console.log(env)
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnexion();