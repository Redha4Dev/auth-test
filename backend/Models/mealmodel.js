const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'An event must have a title'],
  },
  daysOfWeek: {
    type: [Number], 
    required: [true, 'Specify which days this event occurs'],
    validate: {
      validator: function(days) {
        return days.every(day => day >= 0 && day <= 6);
      },
      message: 'Days must be between 0 (Sunday) and 6 (Saturday)'
    }
  },
  startTime: {
    type: String,
    required: [true, 'Event must have a start time'],
  },
  endTime: {
    type: String,
    required: [true, 'Event must have an end time'],
    validate: {
      validator: function(endTime) {
        return endTime > this.startTime;
      },
      message: 'End time must be after start time'
    }
  },
  startRecur: {
    type: Date,
    required: [true, 'Specify when the recurrence starts'],
    default: () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      return `${day}-${month}-${year}`;
  }
  }})

const Meal = mongoose.model('Meal', eventSchema);

module.exports = Meal;