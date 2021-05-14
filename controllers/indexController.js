const path = require('path');

// Path of views directory
const viewsPath = path.dirname(require.main.filename) + '/views/';

// route handles

exports.loadHomepage = (req, res, next) => {
    res.render('index');
}