const Tasks = require('../models/tasks.js');

exports.getAllTasks = (req, res, next) => {
    const userId = req.userId;
    Tasks.getAllTasks(userId)
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

exports.getTask = (req, res, next) => {
    const userId = req.userId;
    Tasks.getTaskById(req.params.taskId, userId)
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
    const userId = req.userId;
    const { title, notes, tagId, dueDate } = req.body;
    const task = new Tasks(userId, title, notes, tagId, dueDate);
    task.createTask()
    .then(data => {
        res
        .status(201)
        .json({
            'message': 'Task created successfully'
        })
    })
    .catch(err => {
        const error = new Error(err);
        error.status = 401;
        next(error);
    });
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
    const userId = req.userId;
    Tasks.deleteTask(req.params.taskId, userId)
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