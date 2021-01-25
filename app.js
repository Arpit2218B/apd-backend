const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoConnect = require('./utils/database').dbConnect;
const tasksRouter = require('./routes/tasks');
const authRouter = require('./routes/auth');
const tagsRouter = require('./routes/tags');
const authMiddleWare = require('./middlewares/auth');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/tasks', authMiddleWare, tasksRouter);

app.use('/tags', authMiddleWare, tagsRouter);

app.use('/auth', authRouter);

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Internal server error';
    res
    .status(status)
    .json({
        'message': message
    });
});


mongoConnect(() => {
    app.listen(process.env.PORT || 3000, (err) => {
        if(err) {
            console.log('Error starting server');
        }
        else {
            console.log(`Server listening on port ${process.env.PORT || 3000}`);
        }
    });
});