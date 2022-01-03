// external imports
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');

// internal imports
const { notFound, errorHandler } = require('./middleware/common/errorMiddleware');

const userRouter = require('./router/userRouter');
require('dotenv').config();

// db connection
mongoose
    .connect('mongodb://localhost/express-auth', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('database connection successfull'))
    .catch((err) => console.log(err));

// init app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// request parser
app.use(express.json());

// routing setup
app.use('/user', userRouter);

// 404 not found handler
app.use(notFound);

// default error handler
app.use(errorHandler);

app.listen(5000, () => {
    console.log('Server is listening to the port 5000');
});
