//libraries
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

//models
const User = require('../models/user');

exports.postRegister = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json(errors.array())
    }
    const email = req.body.email
    const password = req.body.password
    const userData = {
        fname: req.body.fname,
        lname: req.body.lname,
        street: req.body.street,
        city: req.body.city,
        phone: req.body.number
    }
    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const newUser = new User({
                email: email,
                password: hashedPassword,
                userData: userData,
                cart: {items: []},
            })
            return newUser.save();
        })
    .then((result) => {
        console.log(result);
        res.json("Register is successful!");
    })
    .catch(err =>{
        res.status(500).json(err);
    })
}

exports.postLogin = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(401).json(errors.array())
    }
    const email = req.body.email;
    let currentUser;
    User.findOne({ email: email })
    .then(user => {
        currentUser = user
        const token = jwt.sign(
            {
              email: currentUser.email,
              userId: currentUser._id.toString(),
              userRole: currentUser.role,
            },
            'myToken',
            { expiresIn: '1h' }
          );
          res.status(200).json({ token: token, userId: currentUser._id.toString(), userRole:currentUser.role });
    })
    .catch(err =>{
        res.status(500).json(err);
    })
}