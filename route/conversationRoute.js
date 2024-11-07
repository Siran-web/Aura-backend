const express = require('express');
const conversationController = require('../controller/conversationController');
const router = express.Router();

router.post('/creat',conversationController.startConversation);
router.get('/getUser/:conversationId',conversationController.getUserConversations);

module.exports = router;