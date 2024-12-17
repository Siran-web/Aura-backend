const express = require('express');
const conversationController = require('../controller/conversationController');
const router = express.Router();

router.post('/create',conversationController.startConversation);
router.get('/getUser/:conversationId',conversationController.getUserConversations);
router.post('/getConvo',conversationController.getConversation);

module.exports = router;