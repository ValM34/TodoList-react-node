const Task = require('../models/task');

exports.getAll = async (req, res, next) => {
  const tasks = await Task.findAll()
    .then(tasks => {
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
    content: req.body.content
  })
    .then(() => res.status(201).json({message: "TASK CREATED"}))
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