const asyncHandler = require("express-async-handler");

exports.getGoals = asyncHandler(async (req, res, next) => {
  res.json({ message: "Good job" });
});

exports.createGoal = asyncHandler(async (req, res, next) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  res.json({ message: "goal created" });
});

exports.updateGoal = asyncHandler(async (req, res, next) => {
  res.json({ message: "Good job" });
});

exports.deleteGoal = asyncHandler(async (req, res, next) => {
  res.json({ message: "Good job" });
});
