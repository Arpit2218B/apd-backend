const db = require('../utils/database').getDB();
const mongodb = require('mongodb');

class Tasks {
    constructor(userId, title, summary, notes, badgeId) {
        this.userId = userId;
        this.title = title;
        this.summary = summary;
        this.notes = notes;
        this.badgeId = badgeId;
        this.category = 5;
        this.lastModified = new Date();
    }

    static getAllTasks() {
        // fetch userId from db 
        const userId = '';
        return db
        .collection('Tasks')
        .find({userId: userId})
        .toArray()
        .then(data => data)
    }

    static getTaskById(taskId) {
        // fetch userId from db
        const userId = '';
        return db
        .collection('Tasks')
        .find({id: new mongodb.ObjectId(taskId), userId: userId})
        .toArray()
        .then(data => {
            if(data.length == 0)
                return Promise.reject('Cannot access resource')
            return data[0];
        });
    }

    createTask() {
        return db
        .collection('Tasks')
        .insertOne(this)
        .then(data => data)
    }

    static deleteTask(taksId) {
        // fetch userId from db
        const userId = '';
        return db
        .collection('Tasks')
        .remove({_id: new mongodb.ObjectId(taskId), userId: userId})
        .then(data => {
            if(data.matchedCount == 0)
                return Promise.reject('Cannot find the resource to be deleted');
            return data;
        });
    }

    static modfyTask(data, taskId) {
        data.lastModified = new Date();
        delete data.userId;
        return db
        .collection('Tasks')
        .update({_id: new mongodb.ObjectId(taskId)}, {$set: data})
        .then(result => {
            if(result.matchedCount == 0)
                return Promise.reject('Could not find given resource to update');
            return result;
        });
    }
}

module.exports = Tasks;