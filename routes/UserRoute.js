const UserController = require('../controllers/UserController');
const express = require('express');
const { verifyToken } = require('../middleware/tokenVerify');
const router = express.Router();

router.post('/signup', UserController.signup)
router.post('/login', UserController.login)
router.post('/verify', UserController.verify)
router.put('/update', verifyToken, UserController.updateProfile)
router.delete('/delete', verifyToken, UserController.deleteProfile)
router.get('/profile', verifyToken, UserController.profile)
router.post('/forgot', UserController.forgotPassword)

module.exports = router