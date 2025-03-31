const express = require("express");
const {
  getWorkouts,
  getProducts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
  getSelectedProducts,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth.jsx");

const router = express.Router();
router.use(requireAuth);
router.get("/", getWorkouts);
router.get("/products", getProducts);
router.get("/selected", getSelectedProducts);

router.get("/:id", getWorkout);
router.post("/", createWorkout);
router.delete("/:id", deleteWorkout);
router.patch("/:id", updateWorkout);

module.exports = router;
