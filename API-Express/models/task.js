const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/todolist_react_node');

const Task = sequelize.define('Task', {
  // Model attributes are defined here
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0
  }
}, {
  // Other model options go here
});

module.exports = Task;

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true