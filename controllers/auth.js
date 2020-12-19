const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    const userId = req.body.userId;
    // if first time user, create entry in db with all the defaults
    // create jwt
    const token = jwt.sign({
        userId: userId
    }, 'secretString', {expiresIn: '1h'});
    // send back
    res
    .status(200)
    .json({
        'token': token,
        'userId': userId
    });
}