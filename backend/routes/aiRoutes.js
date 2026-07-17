const express = require("express");
const router = express.Router();

const { analyzeReviewAI } = require("../controllers/aiController");

router.post("/analyze", analyzeReviewAI);

module.exports = router;