const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

const checkAuth = require('./../middleware/checkAuth');

router.get('/send', dataController.sendDataForm);

router.post('/send', dataController.sendData);

router.get('/view', dataController.viewData);


module.exports = router;
