const Message = require('../model/messageModel'); 
const Conversation = require('../model/conversationModel'); 

module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('joinRoom', (conversationId) => {
            console.log(`User ${socket.id} joined room: ${conversationId}`);
            socket.join(conversationId);
        });

        socket.on('sendMessage', async (data) => {
            const { conversationId, senderId, content } = data;

            const newMessage = new Message({
                content,
                senderId,
                conversationId
            });
            await newMessage.save();

            // Emit message to the room (all members in the conversation)
            io.to(conversationId).emit('receiveMessage', newMessage);
            console.log('Message sent and saved:', newMessage);
        });

        socket.on('message_receive', async (conversationId) => {
            try {
                // Fetch all messages for the conversation from the database
                const messages = await Message.find({ conversationId }).populate('senderId', 'name');

                // Emit all messages in the room to the user
                socket.emit('receiveAllMessages', messages);
                console.log('Messages sent to the user:', messages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};
