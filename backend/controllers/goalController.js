const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

exports.getGoals = asyncHandler(async (req, res, next) => {
  const goals = await Goal.find();
  res.status(200).json({ goals });
});

exports.createGoal = asyncHandler(async (req, res, next) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const goal = await Goal.create(req.body);
  res.status(201).json({ goal });
});

exports.updateGoal = asyncHandler(async (req, res, next) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found!");
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
    throw new Error("Goal not found!");
  }
  await Goal.deleteOne({ _id: req.params.id });
  res.status(200).json({ id: req.params.id });
});
// await Goal.findByIdAndDelete(req.params.id);
