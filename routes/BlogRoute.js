const BlogController = require('../controllers/BlogController')
const express = require('express');
const router = express.Router();

router.post('/add', BlogController.addData)
router.get('/delete/:id', BlogController.deleteData)
router.get('/getdata', BlogController.getData)
router.post("/updateData/:id", BlogController.updateData);

module.exports = router