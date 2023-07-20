const express = require('express');
const app = express();
require('dotenv').config()


// PORT is define
const PORT = process.env.PORT || 3002

// Parses the text as url encoded data
app.use(express.json());

// check api
app.get('/', (req,res) => {
    res.json({ status: 200, message: 'API is working' })
})

// Router import and use
app.use('/api', require('./routes/UserRoute'));

// DB import and call
const db = require('./config/DB')
db.on("error", () => console.log("connection error:"));
db.once("open", () => console.log("Database is connected"));

app.listen(PORT, () => {
    console.log("Server is running http://localhost:"+PORT);
})
