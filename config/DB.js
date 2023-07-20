const mongoose = require('mongoose');

// I am using mongodb cluster online 
mongoose.connect(
  "mongodb://127.0.0.1:27017/nodeapi",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// mongoose.connect('mongodb://localhost:27017/b2d', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
module.exports = db
