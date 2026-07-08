"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/ui/Loader";
import Toast from "@/components/ui/Toast";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [review, setReview] = useState("");
  const [guestName, setGuestName] = useState("");
  const [search, setSearch] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/reviews");
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      toast.error("Failed to load reviews");
    }
  };

  const searchReviews = async () => {
    try {
      if (!search.trim()) {
        fetchReviews();
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/reviews/search?q=${search}`
      );

      const data = await response.json();
      setReviews(data);
    } catch (err) {
      toast.error("Search failed");
    }
  };

  const analyzeSentiment = (text) => {
    const positiveWords = [
      "good",
      "great",
      "excellent",
      "clean",
      "friendly",
      "nice",
      "awesome",
      "perfect",
      "comfortable",
      "amazing",
      "love"
    ];

    const negativeWords = [
      "dirty",
      "bad",
      "worst",
      "poor",
      "slow",
      "hate",
      "smelly",
      "broken",
      "terrible",
      "awful"
    ];

    const lower = text.toLowerCase();

    let positive = 0;
    let negative = 0;

    positiveWords.forEach(word => {
      if (lower.includes(word)) positive++;
    });

    negativeWords.forEach(word => {
      if (lower.includes(word)) negative++;
    });

    if (positive > negative) return "Positive";
    if (negative > positive) return "Negative";
    return "Neutral";
  };

  const submitReview = async () => {
    if (!guestName.trim() || !review.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    const sentiment = analyzeSentiment(review);

    try {
      if (editingId) {
        await fetch(
          `http://localhost:5000/api/reviews/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              guestName,
              review,
              sentiment
            })
          }
        );

        toast.success("Review Updated");
      } else {
        await fetch(
          "http://localhost:5000/api/reviews",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              guestName,
              review,
              sentiment
            })
          }
        );

        toast.success("Review Added");
      }

      setGuestName("");
      setReview("");
      setEditingId(null);

      fetchReviews();

    } catch (err) {
      toast.error("Operation failed");
    }

    setLoading(false);
  };

  const deleteReview = async (id) => {
    if (!confirm("Delete this review?")) return;

    try {
      await fetch(
        `http://localhost:5000/api/reviews/${id}`,
        {
          method: "DELETE"
        }
      );

      toast.success("Deleted Successfully");

      fetchReviews();

    } catch {
      toast.error("Delete Failed");
    }
  };

  const editReview = (item) => {
    setEditingId(item._id);
    setGuestName(item.guestName);
    setReview(item.review);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const badgeColor = (sentiment) => {
    switch (sentiment) {
      case "Positive":
        return "bg-green-500";
      case "Negative":
        return "bg-red-500";
      case "Neutral":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };
    return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full p-8">

        <div className="bg-white shadow-lg rounded-xl p-8">

          <h1 className="text-4xl font-bold text-green-700">
            Homestay Review Dashboard
          </h1>

          <p className="text-gray-600 mt-2 mb-6">
            Analyze guest reviews, detect sentiment and manage all reviews.
          </p>

          {/* Search */}

          <div className="flex gap-3 mb-6">

            <input
              type="text"
              placeholder="Search by guest or review..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border rounded-lg p-3"
            />

            <button
              onClick={searchReviews}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
            >
              Search
            </button>

            <button
              onClick={fetchReviews}
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 rounded-lg"
            >
              Reset
            </button>

          </div>

          {/* Form */}

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Guest Name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="border rounded-lg p-3"
            />

            <div></div>

          </div>

          <textarea
            rows={6}
            placeholder="Write guest review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="border rounded-lg p-3 w-full mt-4"
          />

          <button
            onClick={submitReview}
            className={`mt-5 px-6 py-3 rounded-lg text-white font-semibold ${
              editingId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-700 hover:bg-green-800"
            }`}
          >
            {editingId ? "Update Review" : "Analyze & Save Review"}
          </button>

          {loading && (
            <div className="mt-5">
              <Loader />
            </div>
          )}

        </div>

        {/* Reviews */}

        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-6">
            All Reviews ({reviews.length})
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {reviews.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-xl shadow-lg p-6"
              >

                <div className="flex justify-between items-center">

                  <h3 className="text-xl font-bold">
                    {item.guestName}
                  </h3>

                  <span
                    className={`text-white px-3 py-1 rounded-full text-sm ${badgeColor(
                      item.sentiment
                    )}`}
                  >
                    {item.sentiment}
                  </span>

                </div>

                <p className="mt-4 text-gray-700">
                  {item.review}
                </p>

                {item.theme && (
                  <p className="mt-3">
                    <strong>Theme:</strong> {item.theme}
                  </p>
                )}

                {item.response && (
                  <p className="mt-2">
                    <strong>AI Response:</strong> {item.response}
                  </p>
                )}

                <p className="mt-4 text-xs text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </p>

                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() => editReview(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteReview(item._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

      <Toast />
      <Footer />
    </div>
  );
}