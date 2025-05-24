const express = require('express');
const mealController = require('../controllers/mealcontroller');
const router = express.Router();


router
    .route('/:id')
    .get(mealController.getMeal)
    .post(mealController.createMeal)
    .patch()
    .delete(mealController.removeMeal)
    

module.exports = router;
