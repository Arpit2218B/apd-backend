const router = require('express').Router();
const tasksController = require('../controllers/tasks');

router.get('/', tasksController.getAllTasks);

router.get('/:taskId', tasksController.getTask);

router.post('/', tasksController.createTask);

router.patch('/'. tasksController.updateTask);

router.delete('/:taskId', tasksController.deleteTask);

module.exports = router;