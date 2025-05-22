const express = require('express');
const mealController = require('../controllers/mealcontroller')
const router = express.Router();
const authController = require('../controllers/authentication')


router
    .route('/:id')
    .get()
    .post(mealController.createMeal)
    .patch()
    .delete(mealController.removeMeal)
    

module.exports = router;
