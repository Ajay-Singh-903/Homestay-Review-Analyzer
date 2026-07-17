const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    guestName: {
      type: String,
      required: true,
      trim: true,
    },

    review: {
      type: String,
      required: true,
      trim: true,
    },

    // Original sentiment used for badge
    sentiment: {
      type: String,
      default: "Pending",
    },

    // AI-generated sentiment
    aiSentiment: {
      type: String,
      default: "",
    },

    // AI-generated theme
    theme: {
      type: String,
      default: "",
    },

    // AI-generated reply
    response: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);