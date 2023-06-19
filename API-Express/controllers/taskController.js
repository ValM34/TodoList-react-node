const Task = require('../models/task');

exports.getAll = async (req, res, next) => {
  const tasks = await Task.findAll({ where: { userId: req.auth.userId } })
    .then(tasks => {
      console.log(tasks)
      console.log(req.auth.userId)
      res.status(200).json(tasks);
    })
}

exports.getOneById = async (req, res, next) => {
  const task = await Task.findAll({ where: { id: req.params.id } })
    .then(task => {
      console.log(task)
      res.status(200).json(task);
    })
}

exports.create = async (req, res, next) => {
  const newTask = await Task.create({
    content: req.body.content,
    userId: req.auth.userId,
    title: req.body.title
  })
    .then((newTask) => res.status(201).json({message: "TASK CREATED", task: newTask}))
}

exports.update = async (req, res, next) => {
  const newTask = await Task.update({ content: req.body.content }, {
    where: {
      id: req.body.id
    }
  })
    .then(() => res.status(201).json({message: "TASK CREATED"}))
}

exports.delete = async (req, res, next) => {
  console.log(req.body)
  const deleteTask = await Task.destroy({
    where: {
      id: req.body.id
    }
  })
    .then(() => res.status(200).json({message: 'TACHE SUPPRIMEE'}))
}