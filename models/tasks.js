const getDb = require('../utils/database').getDB;
const mongodb = require('mongodb');

class Tasks {
    constructor(userId, title, notes, tagId, dueDate) {
        this.userId = userId;
        this.title = title;
        this.notes = notes;
        this.tagId = tagId;
        this.category = 5;
        this.createdAt = new Date();
        this.dueDate = dueDate;
        this.lastModified = new Date();
        this.completedAt = null;
        this.isCompleted = false;
        this.isArchived = false;
    }

    static getAllTasks(userId) {
        const db = getDb();
        return db
        .collection('Tasks')
        .find({userId: userId})
        .toArray()
        .then(data => data)
    }

    static getTaskById(taskId, userId) {
        const db = getDb();
        return db
        .collection('Tasks')
        .find({_id: new mongodb.ObjectId(taskId), userId: userId})
        .toArray()
        .then(data => {
            if(data.length == 0)
                return Promise.reject('Cannot access resource')
            return data[0];
        });
    }

    createTask() {
        const db = getDb();
        return db
        .collection('Tasks')
        .insertOne(this)
        .then(data => data)
    }

    static deleteTask(taskId, userId) {
        const db = getDb();
        return db
        .collection('Tasks')
        .deleteOne({_id: new mongodb.ObjectId(taskId), userId: userId})
        .then(data => {
            if(data.deletedCount == 0)
                return Promise.reject('Cannot find the resource to be deleted');
            return data;
        });
    }

    static modifyTask(data, taskId) {
        const db = getDb();
        data.lastModified = new Date();
        delete data.userId;
        return db
        .collection('Tasks')
        .updateOne({_id: new mongodb.ObjectId(taskId)}, {$set: data})
        .then(result => {
            if(result.matchedCount == 0)
                return Promise.reject('Could not find given resource to update');
            return result;
        });
    }
}

module.exports = Tasks;