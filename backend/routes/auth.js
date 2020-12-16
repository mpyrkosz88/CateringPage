const express = require('express');
const { body } = require('express-validator');

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
            .isEmail().withMessage("It's not a proper email")
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then(userDoc => {
                    console.log(userDoc);
                    if (userDoc) {
                        return Promise.reject('E-Mail exists already, please pick a different one.');
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

router.post('/login', authController.postLogin)


module.exports = router