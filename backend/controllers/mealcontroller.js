const Meal  = require('../models/mealmodel');
const catchError = require('../utils/catchError');
const AppError = require('../utils/apperror');

exports.createMeal = catchError(async (req, res, next) => {
  const { title, daysOfWeek, startTime, endTime, startRecur} = req.body;

  
  if (!title || !daysOfWeek || !startTime || !endTime) {
    return next(new AppError('Please provide title, days, start and end times', 400));
  }

  const newMeal = await Meal.create({
    title,
    daysOfWeek,
    startTime,
    endTime,
    startRecur: startRecur || '2024-01-01', 

  });

  res.status(201).json({
    status: 'success',
    
      meal: newMeal

  });
});

exports.removeMeal = catchError(async (req, res, next) => {
    const meal = await Meal.findByIdAndDelete(req.params.id);
  
    if (!meal) {
      return next(new AppError('No meal found with that ID', 404));
    }
  
    res.status(204).json({
      status: 'success',
    });
  });