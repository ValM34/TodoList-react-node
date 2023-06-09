const taskList = require('../data/taskList.json');

exports.getAllTasks = (req, res, next) => {
  return res.status(200).json(taskList)
}