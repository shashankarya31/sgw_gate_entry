const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.post('/send', dataController.sendData);

router.get('/view', dataController.viewData);

module.exports = router;
