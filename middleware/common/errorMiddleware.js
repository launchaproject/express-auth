// external imports
const createError = require('http-errors');

// 404 not found
const notFound = (req, _res, next) => {
    next(createError(404, `Not Found - ${req.originalUrl}`));
};

// default
const errorHandler = (err, _req, res, _next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = {
    notFound,
    errorHandler,
};
