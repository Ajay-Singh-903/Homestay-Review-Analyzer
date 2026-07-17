const { analyzeReview } = require("../services/huggingFaceService");
const service = require("../services/huggingFaceService");

console.log("Service:", service);
console.log("Type:", typeof service);
console.log(service);
const analyzeReviewAI = async (req, res) => {
  try {
    const { review } = req.body;

    const result = await service.analyzeReview(review);

    res.json({
      result,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  analyzeReviewAI,
};