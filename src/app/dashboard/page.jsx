"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/ui/Loader";
import Toast from "@/components/ui/Toast";

import toast from "react-hot-toast";

export default function Dashboard() {
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const analyzeReview = async () => {
    if (!review.trim()) {
      toast.error("Please enter a review.");
      return;
    }

    setLoading(true);

    try {
      // Save Review (POST)
      await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guestName: "Ajay",
          review: review,
          sentiment: "Pending",
        }),
      });

      // Fetch All Reviews (GET - Status 200)
      const response = await fetch("http://localhost:5000/api/reviews");
      const data = await response.json();

      setReviews(data);

      toast.success("Review submitted successfully!");
      setReview("");
    } catch (error) {
      toast.error("Backend connection failed.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow p-10">
        <h1 className="text-3xl font-bold">
          Review Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Paste one or multiple guest reviews to analyze sentiment,
          detect themes, and generate AI-powered responses.
        </p>

        <textarea
          className="border w-full p-4 mt-4 rounded"
          rows={8}
          placeholder="Paste guest reviews here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <button
          onClick={analyzeReview}
          className="bg-green-700 text-white px-5 py-2 rounded mt-4"
        >
          Analyze Reviews
        </button>

        {loading && (
          <div className="mt-4">
            <Loader />
          </div>
        )}

        {reviews.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">
              All Reviews
            </h2>

            {reviews.map((item) => (
              <div
                key={item.id}
                className="border rounded p-4 mb-4 bg-gray-100 text-black"
              >
                <p>
                  <strong>ID:</strong> {item.id}
                </p>

                <p>
                  <strong>Guest:</strong> {item.guestName}
                </p>

                <p>
                  <strong>Review:</strong> {item.review}
                </p>

                <p>
                  <strong>Sentiment:</strong> {item.sentiment}
                </p>

                {item.theme && (
                  <p>
                    <strong>Theme:</strong> {item.theme}
                  </p>
                )}

                {item.response && (
                  <p>
                    <strong>AI Response:</strong> {item.response}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Toast />
      <Footer />
    </div>
  );
}