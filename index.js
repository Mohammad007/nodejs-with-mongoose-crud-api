const express = require('express');
const app = express();
const bodyParser = require("body-parser");


// PORT is define
const PORT = process.env.PORT || 1000



// Parses the text as url encoded data
app.use(bodyParser.urlencoded({extended: true}));  
app.use(bodyParser.json());

// Router import and use
app.use('/api', require('./routes/BlogRoute'))


// DB import and call
const db = require('./config/DB')
db.on("error", () => console.log("connection error:"));
db.once("open", () => console.log("Database is connected"));

app.listen(PORT, () => {
    console.log("Server is running");
})