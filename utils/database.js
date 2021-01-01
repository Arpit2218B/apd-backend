const URI = 'mongodb+srv://root:root@cluster0.fahmz.mongodb.net/apd?retryWrites=true&w=majority';

const mongodb = require('mongodb');

const mongoClient = mongodb.MongoClient;

let db;

exports.dbConnect = (callback) => {
    mongoClient.connect(URI)
    .then(client => {
        db = client.db();
        console.log('Connected to database');
        callback();
    })
    .catch(err => {
        console.log('Error connecting to database');
    });
}

exports.getDB = () => {
    if(db) {
        return db;
    }
    else {
        return null;
    }
}