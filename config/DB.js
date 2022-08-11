const mongoose = require('mongoose');

// I am using mongodb cluster online 
mongoose.connect(
  "mongodb+srv://crud-api:Bilal@8477908696@cluster0.iztdw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// mongoose.connect('mongodb://localhost:27017/b2d', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
module.exports = db
