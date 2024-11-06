const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const authRoute = require("./route/authRoute");

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use('/api',authRoute);

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server lsitening on port ${PORT}`);
})