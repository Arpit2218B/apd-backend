const Tasks = require('../models/tasks.js');

exports.getAllTasks = (req, res, next) => {
    Tasks.getAllTasks()
    .then(res => {
        res
        .status(200)
        .json(res)
    })
    .catch(err => {
        const error = new Error(err);
        error.status = 404;
        next(error);
    });
}

exports.getTask = (req, res, next) => {
    Tasks.getTaskById(req.params.taskId)
    .then(data => {
        res
        .status(200)
        .json(data)
    })
    .catch(err => {
        const error = new Error(err);
        error.status = 404;
        next(error);
    });
}

exports.createTask = (req, res, next) => {
    const { title, summary, notes, badgeId } = req.body;
    const userId = ''       // get from db
    const task = new Tasks(userId, title, summary, notes, badgeId);
    task.createTask()
    .then(data => {
        res
        .status(201)
        .json({
            'message': 'Task created successfully'
        })
    })
}

exports.modifyTask = (req, res, next) => {
    Tasks.modifyTask(req.body, req.params.taskId)
    .then(data => {
        res
        .status(201)
        .json({
            'message': 'Task modified successfully'
        })
    })
    .catch(err => {
        const error = new Error(err);
        error.status = 404;
        next(error);
    });
}

exports.deleteTask = (req, res, next) => {
    Tasks.deleteTask(req.params.taskId)
    .then(data => {
        res
        .status(200)
        .json({
            'message': 'Task deleted successfully'
        })
    })
    .catch(err => {
        const error = new Error(err);
        error.status = 404;
        next(error);
    });
}