const jwt = require('jsonwebtoken');

const User = require('./../models/userModel');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decToken = jwt.verify(token, process.env.JWT_KEY);
        req.userInfo = decToken;
        next();
    } catch(err) {
        return res.status(404).json({
            error: 'Invalid credentials!'
        });
    }
};