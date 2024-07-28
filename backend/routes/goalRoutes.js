const express = require('express');

const router = express.Router();
const goalController = require('../controllers/goalController');
const authMiddleware = require('../middlewares/authMiddleware');

router
  .route('/')
  .get(authMiddleware.protect, goalController.getGoals)
  .post(authMiddleware.protect, goalController.createGoal);
router
  .route('/:id')
  .put(authMiddleware.protect, goalController.updateGoal)
  .delete(authMiddleware.protect, goalController.deleteGoal);

module.exports = router;
