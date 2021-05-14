const jwt = require('jsonwebtoken');

const User = require('./../models/userModel');

function parseCookies(cookie) {
    var list = {},
        rc = cookie;

    rc && rc.split(';').forEach(function (cookie) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

module.exports = async (req, res, next) => {
    try {
        const cookieData = parseCookies(req.headers.cookie);
        const token = cookieData.jwt;
        const decToken = jwt.verify(token, process.env.JWT_KEY);
        req.userInfo = decToken;
        next();
    } catch(err) {
        return res.status(404).render('error', { message: 'Invalid credentials!' });
    }
};