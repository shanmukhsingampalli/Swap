const Workout = require("../models/workoutModel");

const mongoose = require("mongoose");

const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

const getProducts = async (req, res) => {
  const workouts = await Workout.find().sort({ createdAt: -1 });
  res.status(200).json(workouts);
};
const getSelectedProducts = async (req, res) => {
  const { title } = req.query;
  try {
    const workouts = title
      ? await Workout.find({ title: { $regex: title, $options: "i" } }) // Case-insensitive search
      : await Workout.find();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

const createWorkout = async (req, res) => {
  const { title, quantity, num, url } = req.body;
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!quantity) {
    emptyFields.push("quantity");
  }
  if (!num) {
    emptyFields.push("num");
  }
  if (!url) {
    emptyFields.push("url");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({
      title,
      quantity,
      num,
      user_id,
      url,
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
  getProducts,
  getSelectedProducts,
};
