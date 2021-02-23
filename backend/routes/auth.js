const express = require('express');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');

const router = express.Router()

const authController = require('../controllers/auth');
const User = require('../models/user');

router.post('/register',
    [
        body('fname')
            .isString().withMessage("It's not a string")
            .isLength({ min: 3 }).withMessage("Minimal length of First name is 3")
            .notEmpty().withMessage("First name is required"),
        body('lname')
            .isString().withMessage("It's not a string")
            .isLength({ min: 3 }).withMessage("Minimal length of Last name is 3")
            .notEmpty().withMessage("Last name is required"),
        body('street')
            .isString().withMessage("It's not a string")
            .isLength({ min: 3 }).withMessage("Minimal length of Street name is 3")
            .notEmpty().withMessage("Street name is required"),
        body('city')
            .isString().withMessage("It's not a string")
            .isLength({ min: 3 }).withMessage("Minimal length of City name is 3")
            .notEmpty().withMessage("City name is required"),
        body('number')
            .isFloat().withMessage("It's not a number")
            .isLength({ min: 9 }).withMessage("Length of Phone number is 9")
            .notEmpty().withMessage("Phone number is required"),
        body('email')
            .isEmail().withMessage("Please type valid e-mail")
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then(userDoc => {
                    if (userDoc) {
                        throw new Error('E-Mail exists already, please pick a different one.');
                    }
                });
            })
            .normalizeEmail(),
        body('password')
            .isLength({ min: 6 }).withMessage("Minimal length of Password is 6")
            .isAlphanumeric()
            .trim(),
        body('confirmPassword')
            .trim()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords have to match!');
                }
                return true;
            }),
    ],
    authController.postRegister)

router.post('/login',
    [
        body('email')
            .isEmail().withMessage("Please type valid e-mail")
            .custom((value, { req }) => {
                return User.findOne({ email: value.toLowerCase() }).then(userDoc => {
                    if (!userDoc) {
                        throw new Error("A user with this email could not be found.");
                    }
                });
            })
            .normalizeEmail(),
        body('password').custom((value, { req }) => {
            let currentUser
            return User.findOne({ email: req.body.email }).then(user => {
                if (user) {
                    currentUser = user
                    return bcrypt.compare(value, currentUser.password)
                        .then(isEqual => {
                            if (!isEqual) {
                                const error = new Error('Wrong password!');
                                error.statusCode = 401;
                                throw error
                            }
                        })
                };
            })
        }),
    ],
    authController.postLogin)

router.post('/reset',
    [
        body('email')
        .isEmail().withMessage("Please type valid e-mail")
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then(userDoc => {
                if (!userDoc) {
                    throw new Error("A user with this email could not be found.");
                }
            });
        })
        .normalizeEmail(),
    ],
    authController.postReset);

router.post('/new-password', 
[
    body('resetToken')
        .custom((value, { req }) => {
            return User.findOne({ resetToken: value }).then(userDoc => {
                if (!userDoc) {
                    throw new Error('Token has been already expired');
                }
            });
        }),
    body('password')
        .isLength({ min: 6 }).withMessage("Minimal length of Password is 6")
        .isAlphanumeric()
        .trim(),
    body('confirmPassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords have to match!');
            }
            return true;
        }),
]
, authController.postNewPassword);

module.exports = router