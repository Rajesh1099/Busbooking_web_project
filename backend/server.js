const express = require('express');
const app = express();
require('dotenv').config;
const dbconfig = require("./config/dbconfig")
const usersRoute = require('./routes/usersRoute');
const { encodeXText } = require('nodemailer/lib/shared');
const port = process.env.PORT || 5000;
app.use(express.json())



app.listen(port,()=>console.log(`Node server listening on port ${port}`));

