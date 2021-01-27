const getDb = require('../utils/database').getDB;

class User {
    constructor(userName, password, email, isGoogleAccount) {
        this.userId =  new Date().valueOf();
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.isGoogleAccount = isGoogleAccount;
        this.settings = {
            theme: 'default',
            view: 'default',
            lastNdaysTask: 7
        }
    }

    loginUser() {
        const db = getDb();
        const email = this.email;
        const password = this.password;
        const isGoogleAccount = this.isGoogleAccount;
        return db
        .collection('users')
        .find({'email': email})
        .toArray()
        .then(data => {
            if(data.length > 0 && !data[0].isGoogleAccount && !password) {
                throw Error('Password not provided');
            }
            else if(data.length > 0 && isGoogleAccount) {
                return data[0];
            }
            else if(data.length == 0 && isGoogleAccount) {
                return this.createUser();
            }
            else if(data.length == 0 && !isGoogleAccount) {
                throw Error('User account does not exists');
            }
            else {
                return db
                .collection('users')
                .find({email: email, password: password})
                .toArray()
                .then(data => {
                    if(data.length == 0)
                        throw Error('Wrong password')
                    return data[0];
                });
            }
        });
    }

    createUser() {
        const db = getDb();
        const email = this.email;
        return db
        .collection('users')
        .find({'email': email})
        .toArray()
        .then(data => {
            if(data.length == 0)
            {
                return db
                .collection('users')
                .insertOne(this)
                .then(data => {
                    return data.ops[0];
                });
            }
            throw Error('User exists');
        });
    }

    static loginUser(userName, password) {
        return true;
    }
}

module.exports = User;