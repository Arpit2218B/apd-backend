const jwt = require('jsonwebtoken');
const User = require('../models/auth');

exports.login = (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const email = req.body.email;
    const isGoogleAccount = req.body.password ? false : true;
    const user = new User(userName, password, email, isGoogleAccount);
    user
    .loginUser()
    .then(data => {
        const token = jwt.sign({
            userId: data.userId
        }, 'secretString', {expiresIn: '1h'});
        res
        .status(200)
        .json({
            'token': token,
            'userId': data.userId
        });
    })
    .catch(err => {
        const error = new Error(err);
        err.status = 400;
        next(error);
    });
}

exports.register = (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password || null;
    const email = req.body.email;
    const isGoogleAccount = req.body.password ? false : true;
    const user = new User(userName, password, email, isGoogleAccount);
    user
    .createUser()
    .then(data => {
        const token = jwt.sign({
            userId: data.userId
        }, 'secretString', {expiresIn: '1h'});
        res
        .status(200)
        .json({
            'token': token,
            'userId': data.userId
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.status = 400;
        next(error);
    });
}