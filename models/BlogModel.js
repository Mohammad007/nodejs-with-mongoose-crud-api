const mongoose = require('mongoose');
const db = require('../config/DB')

const Blog = new mongoose.Schema({
  title: String,
  content: String,
  name: String,
});

const BlogModel = mongoose.model("blog", Blog);
module.exports = BlogModel;
