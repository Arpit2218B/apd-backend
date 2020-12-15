const express = require('express');
const bodyParser = require('body-parser');

const tasksRouter = require('./routes/tasks');

const app = express();

app.use(bodyParser.json());

app.use('/tasks', notesRouter);

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Internal server error';
    res
    .status(status)
    .json({
        'message': message
    });
})

mongoConnect(() => {
    app.listen(process.env.PORT || 3000, (err) => {
        if(err) {
            console.log('Error starting server');
        }
        else {
            console.log(`Server listening on port ${process.env.PORT || 3000}`);
        }
    });
})