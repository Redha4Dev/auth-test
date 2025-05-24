const express = require("express");
const mealController = require("../controllers/mealcontroller");
const router = express.Router();

router
  .route("/:id")
  .get()
  .patch()
  .delete(mealController.removeMeal);
router
    .post(mealController.createMeal)

module.exports = router;
