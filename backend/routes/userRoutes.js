const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.route('/login').post(userController.login);
router.route('/').post(userController.signup);
router.route('/me').get(authMiddleware.protect, userController.getMe);

// router
//   .route('/:id')
//   .put(goalController.updateGoal)
//   .delete(goalController.deleteGoal);

module.exports = router;
