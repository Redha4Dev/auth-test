const express = require('express');
const messageController = require('../controllers/messageController')
const router = express.Router();
const authController = require('../controllers/authentication')

router
    .route('/:id')
    .get(authController.protectroute , messageController.getAllMessages)
    .post(authController.protectroute ,messageController.sendMessage)
    .patch()
    .delete()

router
    .route('/message/:id')
    .get(authController.protectroute , messageController.getMessageDetails)
    .post()
    .patch()
    .delete(authController.protectroute , messageController.deleteMessage)
module.exports = router  