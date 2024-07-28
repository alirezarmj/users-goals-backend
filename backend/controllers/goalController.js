const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

exports.getGoals = asyncHandler(async (req, res, next) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json({ goals });
});

exports.createGoal = asyncHandler(async (req, res, next) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }
  const goal = await Goal.create({ text: req.body.text, user: req.user.id });
  res.status(201).json({ goal });
});

exports.updateGoal = asyncHandler(async (req, res, next) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found!');
  }

  const user = await User.findById(req.user.id);
  //CHECK FOR USER
  if (!user) {
    res.status(401);
    throw new Error('User not found!');
  }
  //Make sure the logged in user is user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized!');
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ updatedGoal });
});

exports.deleteGoal = asyncHandler(async (req, res, next) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found!');
  }
  const user = await User.findById(req.user.id);
  //CHECK FOR USER
  if (!user) {
    res.status(401);
    throw new Error('User not found!');
  }
  //Make sure the logged in user is user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized!');
  }
  await Goal.deleteOne({ _id: req.params.id });
  res.status(200).json({ id: req.params.id });
});
