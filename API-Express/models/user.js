const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/todolist_react_node');

const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
});

module.exports = User;



// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true