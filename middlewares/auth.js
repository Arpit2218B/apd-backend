const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.get('Authorization');
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secretString');
    }
    catch(err) {
        err.status = 400;
        throw err;
    }
    if(!decodedToken) {
        const error = new Error('User not authenticated');
        error.status = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}

// How does the auth works - 
// 
// The user logs in with the google account and is redirected to the application.
// A post request is sent to the backend and the work is done here.
// A JWT is returned back to the user, if error, the user is logged out and error message is shown.
// Now the user uses the JWT with each of his requests.
// If the JWT expires and the user requests for some resource, he his logged out of the application
// with the message, session timed out.