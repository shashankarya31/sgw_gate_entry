const express = require('express');
const router = express();

const UserController = require('./../controllers/userController');

router.get('/', UserController.getUsers);

router.get('/logout', UserController.logoutUser);

router.post('/', UserController.createUser);

router.post('/login', UserController.loginUser);


module.exports = router;