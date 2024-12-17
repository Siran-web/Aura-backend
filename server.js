const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require("./config/db");
const authRoute = require("./route/authRoute");
const userRoute = require("./route/userRoute");
const conversationRoute = require('./route/conversationRoute');
const messageRoute = require('./route/messageRoute');
const http = require('http');
const socketIo = require('socket.io');
const chatSocket = require('./socket/chatSocket');  

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

const server = http.createServer(app);
const io = socketIo(server); 

app.use(express.json());

connectDB();

app.use('/api/user',userRoute);
app.use('/api/auth', authRoute);
app.use('/api/conversation', conversationRoute);
app.use('/api/message', messageRoute);

chatSocket(io);

const PORT = process.env.PORT || 5000;  
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
