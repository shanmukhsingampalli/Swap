require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");

const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const app = express();
app.use(cors({ origin: "*" }));

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// Serve frontend (Vite build)
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

// Catch-all route to handle SPA routing (e.g., /help, /about)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`connected to db & listening on port:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
