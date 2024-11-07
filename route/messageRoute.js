const express = require('express');
const messageController = require('../controller/messageController');
const router = express.Router();

router.post('/add/:conversationId',messageController.addMessage);
router.get('/get/:conversationId',messageController.getMessage);

module.exports = router;