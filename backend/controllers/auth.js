//libraries
const crypto = require('crypto');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');


//models
const User = require('../models/user');


// const sendgridTransport = require('nodemailer-sendgrid-transport');
// const Sendgrid_API_key = process.env.SENDGRID_API_KEY
// const transporter = nodemailer.createTransport(sendgridTransport({
    //     auth: {
        //         api_key: Sendgrid_API_key
        //     }
        //   }))

const gmail_user = process.env.GMAIL_USER
const gmail_pass = process.env.GMAIL_PASS
        
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: gmail_user,
        pass: gmail_pass,
    }
  })

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
        transporter.sendMail({
            to: email,
            from: 'catering@catering-page.com',
            subject: 'Signup succeeded!',
            html: '<h1>You successfully signed up!</h1>'
        });
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

exports.postReset = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(401).json(errors.array())
    }
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        return res.status(422).json(err)
      }
      const token = buffer.toString('hex');
      const email = req.body.email;
      User.findOne({ email: email })
        .then(user => {
          user.resetToken = token;
          user.resetTokenExpiration = Date.now() + 3600000;
          return user.save();
        })
        .then(result => {
            //change path for token for deploy
            transporter.sendMail({
                    to: email,
                    from: 'catering@catering-page.com',
                    subject: 'Password reset',
                    html: `
                    <p>You requested a password reset</p>
                    <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
                    `
                });
            res.json("Password reset successful!");
        })
        .catch(err =>{
            res.status(500).json(err);
        })
    });
  };

  exports.postNewPassword = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(401).json(errors.array())
    }
    const newPassword = req.body.password;
    const resetToken = req.body.resetToken;
    let resetUser;
    User.findOne({
        resetToken: resetToken,
        resetTokenExpiration: { $gt: Date.now() },
    })
    .then(user => {
        resetUser = user;
        return bcrypt.hash(newPassword, 12);
      })
      .then(hashedPassword => {
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;
        return resetUser.save();
      })
      .then(result => {
        res.json("Password has been changed!");
      })
      .catch(err =>{
        res.status(500).json(err);
    })
  };