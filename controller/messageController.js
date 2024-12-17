const Message = require('../model/messageModel');
const Conversation = require('../model/conversationModel');

exports.addMessage = async (req, res) => {
    try {
      const conversationId  = req.params.conversationId;
      const { senderId, content} = req.body;
  
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found.' });
      }
  
      const newMessage = new Message({content, senderId, conversationId});
      await newMessage.save();
      res.status(200).json(newMessage);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add message.' });
    }
  };
  
  exports.getMessage = async (req, res) => {
    try {
        const conversationId = req.params.conversationId;

        const messages = await Message.find({ conversationId });

        if (!messages || messages.length === 0) {
            return res.status(404).json({ error: 'No messages found for this conversation.' });
        }

        res.status(200).json(messages);

    } catch (error) {
        console.error("Error in getMessage:", error);
        res.status(500).json({ error: "Failed to get messages" });
    }
};
