// Connect to the server via Socket.IO
const socket = io('http://10.10.204.131:5000');

// Listen for a message event (this will be sent from the server)
socket.on('receiveMessage', (message) => {
    console.log('New message received: ', message);
});

// Join a specific conversation (using conversation ID)
socket.emit('joinConversation', 'your-conversation-id-here');

// Send a message
socket.emit('sendMessage', {
    senderId: '672b06f05dfdf2c34000e395', 
    conversationId: 'your-conversation-id-here',
    content: 'This is a real-time message from Socket.IO client!'
});
