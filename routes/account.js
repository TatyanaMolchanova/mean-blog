// This file we have to connect to index.js
const express = require('express');
const router = express.Router();
const User = require('../models/user')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

//URL of registration form
router.post('/reg', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        login: req.body.login,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'User has not been added.'})
        } else {
            res.json({success: true, msg: 'User was added.'})
        }
    })
});

// URL of authorization form
router.post('/auth', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    User.getUserByLogin(login, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: "This user was not found."})
        }
        // if we found user with such login, we have to compare passwords
        // 1st argument - from users' input, second argument - from database
        User.comparePass(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 3600 * 24
                });

                res.json({
                    success: true,
                    token: 'JWT' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        login: user.login,
                        email: user.email,
                    }
                })
            } else {
                return res.json({success: false, msg: "Password mismatch."})
            }
        })
    })


});

// URL of user's cabinet
// disallow access to dashboard page until session is not false - only when user will authorize he'll get access to it
router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {
// router.get('/dashboard', (req, res) => {
    // message in browser on main page
    res.send('Dashboard page!')
});

module.exports = router;
