const reviews = require("../data/reviews");

const getAllReviews = (req, res) => {
  res.status(200).json(reviews);
};
const getReviewById = (req, res) => {
  const id = parseInt(req.params.id);

  const review = reviews.find((r) => r.id === id);

  if (!review) {
    return res.status(404).json({
      message: "Review not found",
    });
  }

  res.status(200).json(review);
};
const createReview = (req, res) => {
  const { guestName, review, sentiment, theme, response } = req.body;

  if (!guestName || !review) {
    return res.status(400).json({
      message: "Guest name and review are required",
    });
  }

  const newReview = {
    id: reviews.length + 1,
    guestName,
    review,
    sentiment,
    theme,
    response,
  };

  reviews.push(newReview);

  res.status(201).json(newReview);
};
const updateReview = (req, res) => {
  const id = parseInt(req.params.id);

  const reviewIndex = reviews.findIndex(
    (r) => r.id === id
  );

  if (reviewIndex === -1) {
    return res.status(404).json({
      message: "Review not found",
    });
  }

  const {
    guestName,
    review,
    sentiment,
    theme,
    response,
  } = req.body;

  reviews[reviewIndex] = {
    ...reviews[reviewIndex],
    guestName,
    review,
    sentiment,
    theme,
    response,
  };

  res.status(200).json(reviews[reviewIndex]);
};
const deleteReview = (req, res) => {
  const id = parseInt(req.params.id);

  const reviewIndex = reviews.findIndex(
    (r) => r.id === id
  );

  if (reviewIndex === -1) {
    return res.status(404).json({
      message: "Review not found",
    });
  }

  reviews.splice(reviewIndex, 1);

  res.status(204).send();
};
const searchReviews = (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({
      message: "Search query is required",
    });
  }

  const result = reviews.filter(
    (r) =>
      r.review.toLowerCase().includes(query.toLowerCase()) ||
      r.guestName.toLowerCase().includes(query.toLowerCase())
  );

  res.status(200).json(result);
};
module.exports = {
  getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
    searchReviews
};
