/* eslint-disable prettier/prettier */
// external imports
const { check, validationResult } = require('express-validator');
const createError = require('http-errors');

// internal imports
const User = require('../../models/People');

// register
const registerValidators = [
    check('name')
        .isLength({ min: 1 })
        .withMessage('Name is required')
        .isAlpha('en-US', { ignore: ' -' })
        .withMessage('Name must not contain anything other than alphabet')
        .trim(),
    check('email')
        .isLength({ min: 1 })
        .withMessage('Email is required!')
        .isEmail()
        .withMessage('Invalid email address')
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw createError('Email already is used!');
                }
            } catch (error) {
                throw createError(error.message);
            }
        }),
    check('phone')
        // .isMobilePhone("bn-BD", {
        //    strictMode: true,
        // })
        // .withMessage("Mobile number must be a valid Bangladeshi mobile number")
        .custom(async (value) => {
            try {
                const user = await User.findOne({ phone: value });
                if (user) {
                    throw createError('Phone number already is used!');
                }
            } catch (err) {
                throw createError(err.message);
            }
        }),
    check('password')
        .isStrongPassword()
        .withMessage(
            'Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol',
        ),
];

const registerValidatorsHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.status(500).json({
            errors: mappedErrors,
        });
    }
};

// login
const doLoginValidators = [
    check('username')
        .isLength({
            min: 1,
        })
        .withMessage('Username or Email is required,'),
    check('password')
        .isLength({ min: 1 })
        .withMessage('Password is required'),
];

const doLoginValidationHandlers = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.status(500).json({
            errors: mappedErrors,
        });
    }
};

module.exports = {
    registerValidators,
    registerValidatorsHandler,
    doLoginValidators,
    doLoginValidationHandlers,
};
