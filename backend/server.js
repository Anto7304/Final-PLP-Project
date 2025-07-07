const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const seatRouter = require('./router/items');
const connectDB = require('./models/Db');

//middleware
dotenv.config();
const  app = express();
app.use(cors())
app.use(express.json());

app.use('/',seatRouter);


// mongodb connection
connectDB();


//fireup the server
app.listen(process.env.PORT,
    console.log(`Server is running on https://localhost:${process.env.PORT}`)
);
