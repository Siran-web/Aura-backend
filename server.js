const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const authRoute = require("./route/authRoute");
const conversationRoute = require('./route/conversationRoute');
const messageRoute = require('./route/messageRoute');

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use('/api/auth',authRoute);
app.use('/api/conversation',conversationRoute);
app.use('/api/message',messageRoute);

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server lsitening on port ${PORT}`);
})