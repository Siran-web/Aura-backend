const express = require('express');
const {getUsers} = require('../controller/userController');
const router = express.Router();

router.get('/get',getUsers);

module.exports = router;