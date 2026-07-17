const connectDB = require("./config/db");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const reviewRoutes = require("./routes/reviewRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const aiRoutes = require("./routes/aiRoutes");



dotenv.config();
connectDB();
const app = express();
app.get("/error", (req, res, next) => {
  const error = new Error("Testing Error Middleware");
  error.status = 500;
  next(error);
});
app.use(errorHandler);

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Homestay Review Analyzer Backend is Running!",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});