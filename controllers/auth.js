const jwt = require('jsonwebtoken');
const User = require('../models/auth');

exports.login = (req, res, next) => {
    const userId = req.body.userId;
    const userName = req.body.userName;
    const password = req.body.password || null;
    const isGoogleAccount = req.body.password ? false : true;
    const user = new User(userId, userName, password, isGoogleAccount);
    user
    .createUser()
    .then(data => {
        // if not isGoogleAccount
            //  check for password match (will add later)
        const token = jwt.sign({
            userId: userId
        }, 'secretString', {expiresIn: '1h'});
        res
        .status(200)
        .json({
            'token': token,
            'userId': userId
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.status = 400;
        next(error);
    });
}