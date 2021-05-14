const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

const checkAuth = require('./../middleware/checkAuth');

router.get('/send', checkAuth, dataController.sendDataForm);

router.post('/send', checkAuth, dataController.sendData);

router.get('/view', checkAuth, dataController.viewData);


module.exports = router;
