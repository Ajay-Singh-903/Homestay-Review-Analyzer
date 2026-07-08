const Review = require("../models/Review");

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const createReview = async (req, res) => {
  try {
    const { guestName, review, sentiment, theme, response } = req.body;

    if (!guestName || !review) {
      return res.status(400).json({
        message: "Guest name and review are required",
      });
    }

    const newReview = await Review.create({
      guestName,
      review,
      sentiment,
      theme,
      response,
    });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedReview) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);

    if (!deletedReview) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const searchReviews = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const reviews = await Review.find({
      $or: [
        {
          guestName: {
            $regex: query,
            $options: "i",
          },
        },
        {
          review: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
    searchReviews
};