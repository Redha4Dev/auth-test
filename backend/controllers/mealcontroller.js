const Meal  = require('../Models/mealmodel');
const catchError = require('../utils/catchError');
const AppError = require('../utils/apperror');

exports.createMeal = catchError(async (req, res, next) => {
  const { title, daysOfWeek, startTime, endTime, startRecur , school} = req.body;

  
  if (!title || !daysOfWeek || !startTime || !endTime) {
    return next(new AppError('Please provide title, days, start and end times', 400));
  }

  const newMeal = await Meal.create({
    title,
    daysOfWeek,
    startTime,
    endTime,
    startRecur: startRecur || '2025-01-01', 
    school

  });

  res.status(201).send({
    status: 'success',
    
      meal: newMeal

  });
});

exports.removeMeal = catchError(async (req, res, next) => {
    const meal = await Meal.findByIdAndDelete(req.params.id);
  
    if (!meal) {
      return next(new AppError('No meal found with that ID', 404));
    }
  
    res.status(204).send({
      status: 'success',
    });
  });


exports.getAllMeals = catchError(async (req, res, next) => {


  const meal = await Meal.find( {school : req.params.id} )
    

  if (!meal) {
    return next(new AppError('Meal not found', 404));
  }

  res.status(200).json({
    status: 'success',
    meal
    
  });
});