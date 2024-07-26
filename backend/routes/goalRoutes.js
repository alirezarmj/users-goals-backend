const express = require("express");

const router = express.Router();
const goalController = require("../controllers/goalController");

router.route("/").get(goalController.getGoals).post(goalController.createGoal);
router.route("/:id").put(goalController.updateGoal).delete(goalController.deleteGoal);

module.exports = router;
