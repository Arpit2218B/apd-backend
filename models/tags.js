const getDb = require('../utils/database').getDB;
const mongodb = require('mongodb');

class Tags {
    constructor(tagName, tagColor, userId) {
        this.tagName = tagName;
        this.tagColor = tagColor;
        this.userId = userId;
    }

    createTag() {
        const db = getDb();
        return db
        .collection('tags')
        .insertOne(this)
        .then(res => res)
    }

    static getAllTags(userId) {
        const db = getDb();
        return db
        .collection('tags')
        .find({userId: userId})
        .toArray()
        .then(data => data);
    }

    static deleteTagById(userId, tagId) {
        const db = getDb();
        return db
        .collection('Tasks')
        .find({badgeId: tagId, userId: userId})
        .toArray()
        .then(data => {
            if(data.length > 0)
                return Promise.reject('Tag associated with note, cannot delete it');
            return db
            .collection('tags')
            .deleteOne({_id: new mongodb.ObjectId(tagId), userId: userId})
            .then(data => {
                if(data.deletedCount == 0)
                    return Promise.reject('Error deleting tag, please try again later');
                return data;
            });
        });
    }
}

module.exports = Tags;