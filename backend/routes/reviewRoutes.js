const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const {
  getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
    searchReviews
} = require("../controllers/reviewController");

router.get("/", verifyToken, getAllReviews);
router.get("/search", verifyToken, searchReviews);
router.get("/:id", verifyToken, getReviewById);
router.post("/", verifyToken, createReview);
router.put("/:id", verifyToken, updateReview);
router.delete("/:id", verifyToken, deleteReview);


module.exports = router;