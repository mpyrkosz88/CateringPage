//libraries
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//models
const User = require('../models/user');

exports.postRegister = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword;
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
        console.log(err);
        res.status(500).json(err);
    })
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let currentUser;
    User.findOne({ email: email })
    .then(user => {
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        currentUser = user
        return bcrypt.compare(password, currentUser.password)
    })
    .then(isEqual => {
        if(!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
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