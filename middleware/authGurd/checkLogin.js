// external imports
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            const token = authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const { username, userId } = decoded;
            req.username = username;
            req.userId = userId;
            next();
        } catch (err) {
            next(createError(401, 'Unauthorized'));
        }
    } else {
        res.status(401);
        next(createError(401, 'Unauthorized'));
    }
};

const checkAdmin = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            const token = authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const { role } = decoded;
            console.log({ decoded });
            if (role === 'admin') {
                next();
            } else {
                next(createError(401, 'Not authorized as an admin'));
            }
        } catch (err) {
            next(createError(401, 'Not authorized as an admin'));
        }
    } else {
        res.status(401);
        next(createError(401, 'Not authorized as an admin'));
    }
};

module.exports = {
    checkLogin,
    checkAdmin,
};
