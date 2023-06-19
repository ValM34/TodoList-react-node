const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/todolist_react_node');
const User = require("./user");

const Task = sequelize.define('Task', {
  // Model attributes are defined here
  content: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  // Other model options go here
});

User.hasOne(Task, {
  foreignKey: {
    name: "userId",
    allowNull: false
  },
  onDelete: 'CASCADE',
});
Task.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false
  },
});

module.exports = Task;

// Actualiser le modèle en BDD : 
//Task.sync({force: true});