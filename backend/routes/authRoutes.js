const express = require("express");
const router = express.Router();

const authLimiter = require("../middleware/rateLimiter");

const {
  registerValidation,
  loginValidation,
} = require("../middleware/validateAuth");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

// Register
router.post(
  "/register",
  authLimiter,
  registerValidation,
  registerUser
);

// Login
router.post(
  "/login",
  authLimiter,
  loginValidation,
  loginUser
);

module.exports = router;