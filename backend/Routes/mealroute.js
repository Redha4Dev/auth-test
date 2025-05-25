const express = require("express");
const mealController = require("../controllers/mealcontroller");
const router = express.Router();

router
    .route('/:id')
    .get(mealController.getAllMeals)
    .delete(mealController.removeMeal)
router
    .route('/')
    .post(mealController.createMeal)

module.exports = router;
