const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const User = require('./../models/userModel');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User
            .find()
            .select('email');

        if(users.length > 0) {
            res.status(200).json({
                'Users': users
            });
        } else {
            throw('No users found!')
        }
    } catch (err) {
        console.error(err);

        res.status(404).json({
            error: err
        });
    }
};

exports.createUser = async (req, res, next) => {
    console.log(req.body);
    let user = {
        _id: new mongoose.Types.ObjectId,
        email: req.body.email,
        auth: { encryptedPass: '', key: '', iv: '' },
        fname: req.body.fname,
        lname: req.body.lname
    }

    let pass = req.body.password;

    if(pass.length >= 8) {
        let iv = crypto.randomBytes(4).toString('hex');
        let key = crypto.randomBytes(16).toString('hex');

        let cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
        let encryptedPass = cipher.update(pass, 'utf-8', 'hex');

        encryptedPass = encryptedPass + cipher.final('hex');

        user.auth.encryptedPass = encryptedPass;
        user.auth.key = key;
        user.auth.iv = iv;

        try {
            let newUser = new User(user);
            await newUser.save();

            res.status(200).json({
                message: 'User created',
                user: user.email
            });
        } catch (err) {
            console.error(err);

            res.status(500).json({
                error: err
            });
        }

    }
};

exports.loginUser = async (req, res, next) => {
    try {
        console.log(req.body);
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            console.log(user);
            const pass = req.body.password;
            const cipher = crypto.createCipheriv('aes-256-gcm', user.auth.key, user.auth.iv);
            let encPass = cipher.update(pass, 'utf-8', 'hex');

            if (encPass == user.auth.encryptedPass) {
                const token = jwt.sign({
                    email: user.email,
                    userId: user._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: '3h'
                });

                let no_days = 1;
                let cookieOptions = {
                    expires: new Date(Date.now() + no_days * 24 * 60 * 60 * 1000),
                    httpOnly: true
                };

                res.status(200)
                    .cookie('jwt', token, cookieOptions)
                    .redirect('/data/view');
        
            } else {
                res.status(401).render('error', { message: 'Invalid credentials!' });
            }
        }

    } catch (err) {
        console.error(err);
    }
};
