const express = require('express');
const messageController = require('../controllers/messageController')
const router = express.Router();
const authController = require('../controllers/authentication')

router
    .route('/chat/:id')
    .get()
    .post(authController.protectroute ,messageController.sendMessage)
    .patch()
    .delete()

module.exports = router  