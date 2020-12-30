const getDb = require('../utils/database').getDB;

class User {
    constructor(userId, userName, password, isGoogleAccount) {
        this.userId =  userId;
        this.userName = userName;
        this.password = password;
        this.isGoogleAccount = isGoogleAccount;
        this.settings = {
            theme: 'default',
            view: 'default',
            lastNdaysTask: 7
        }
    }

    createUser() {
        const db = getDb();
        const userId = this.userId;
        const userName = this.userName;
        return db
        .collection('users')
        .find({userId: userId})
        .toArray()
        .then(data => {
            if(data.length == 0)
            {
                return db
                .collection('users')
                .insertOne(this)
                then(data => {
                    return data;
                });
            }
            return 'User exists';
        });
    }

    static loginUser(userName, password) {
        return true;
    }
}

module.exports = User;