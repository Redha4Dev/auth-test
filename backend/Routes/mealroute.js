const express = require('express');
const mealController = require('../controllers/mealcontroller')
const router = express.Router();
const authController = require('../controllers/authentication')


router
    .route('/:id')
    .get()
    .post(authController.protectroute , mealController.createMeal)
    .patch()
    .delete(authController.protectroute , mealController.removeMeal)
    

module.exports = router;
