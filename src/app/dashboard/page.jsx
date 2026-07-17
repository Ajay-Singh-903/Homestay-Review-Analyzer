"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/ui/Loader";
import Toast from "@/components/ui/Toast";

import toast from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();

  const [review, setReview] = useState("");
  const [guestName, setGuestName] = useState("");
  const [search, setSearch] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [aiResult, setAiResult] = useState("");
  const [aiSentiment, setAiSentiment] = useState("");
const [aiTheme, setAiTheme] = useState("");
const [aiResponse, setAiResponse] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/reviews",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Unauthorized");

        if (response.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
        }

        setReviews([]);
        return;
      }

      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load reviews");
      setReviews([]);
    }
  };

  const searchReviews = async () => {
    try {
      if (!search.trim()) {
        fetchReviews();
        return;
      }

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/reviews/search?q=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      setReviews(Array.isArray(data) ? data : []);
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
      "love",
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
      "awful",
    ];

    const lower = text.toLowerCase();

    let positive = 0;
    let negative = 0;

    positiveWords.forEach((word) => {
      if (lower.includes(word)) positive++;
    });

    negativeWords.forEach((word) => {
      if (lower.includes(word)) negative++;
    });

    if (positive > negative) return "Positive";
    if (negative > positive) return "Negative";

    return "Neutral";
  };
const analyzeWithAI = async () => {
  if (!review.trim()) {
    toast.error("Please enter a review.");
    return;
  }

  setLoading(true);

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/ai/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          review,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "AI analysis failed");
      setLoading(false);
      return;
    }

    setAiResult(data.result);

// Extract AI values
const sentimentMatch = data.result.match(/Sentiment:\s*(.*)/i);
const themeMatch = data.result.match(/Theme:\s*(.*)/i);
const responseMatch = data.result.match(/AI Response:\s*([\s\S]*)/i);

setAiSentiment(
  sentimentMatch ? sentimentMatch[1].trim() : ""
);

setAiTheme(
  themeMatch ? themeMatch[1].trim() : ""
);

setAiResponse(
  responseMatch ? responseMatch[1].trim() : ""
);

toast.success("AI Analysis Complete!");

  } catch (error) {
    console.error(error);
    toast.error("Unable to connect to AI.");
  }

  setLoading(false);
};
  const submitReview = async () => {
    if (!guestName.trim() || !review.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    const sentiment = analyzeSentiment(review);

    try {
      const token = localStorage.getItem("token");

      const url = editingId
        ? `http://localhost:5000/api/reviews/${editingId}`
        : "http://localhost:5000/api/reviews";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
  guestName,
  review,
  sentiment,
  aiSentiment,
  theme: aiTheme,
  response: aiResponse,
}),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(
        editingId ? "Review Updated" : "Review Added"
      );

      setGuestName("");
      setReview("");
      setEditingId(null);
      setAiResult("");
setAiSentiment("");
setAiTheme("");
setAiResponse("");

      fetchReviews();
    } catch (err) {
      toast.error("Operation failed");
    }

    setLoading(false);
  };

  const deleteReview = async (id) => {
    if (!confirm("Delete this review?")) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/reviews/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        toast.error("Delete failed");
        return;
      }

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
      behavior: "smooth",
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
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full p-8">

        <div className="bg-white shadow-lg rounded-xl p-8">

          <h1 className="text-4xl font-bold text-green-700">
            Homestay Review Dashboard
          </h1>

          <p className="text-gray-600 mt-2 mb-6">
            Analyze guest reviews and manage all reviews.
          </p>

          <div className="flex gap-3 mb-6">

            <input
              type="text"
              placeholder="Search..."
              className="flex-1 border rounded-lg p-3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              onClick={searchReviews}
              className="bg-blue-600 text-white px-5 rounded-lg"
            >
              Search
            </button>

            <button
              onClick={fetchReviews}
              className="bg-gray-700 text-white px-5 rounded-lg"
            >
              Reset
            </button>

          </div>

          <input
            className="border rounded-lg p-3 w-full mb-4"
            placeholder="Guest Name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />

          <textarea
            rows={6}
            className="border rounded-lg p-3 w-full"
            placeholder="Write review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

        <div className="flex gap-4 mt-5">

  <button
    onClick={analyzeWithAI}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
  >
    Analyze with AI
  </button>

  <button
    onClick={submitReview}
    className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg"
  >
    {editingId ? "Update Review" : "Save Review"}
  </button>

</div>
          {loading && (
            <div className="mt-5">
              <Loader />
            </div>
          )}
          {aiResult && (
  <div className="mt-6 bg-blue-50 border border-blue-300 rounded-xl p-6 shadow-lg">

    <h2 className="text-2xl font-bold text-blue-700 mb-4">
      🤖 AI Analysis
    </h2>

    <pre className="whitespace-pre-wrap text-gray-800 font-sans">
      {aiResult}
    </pre>

  </div>
)}

        </div>

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

                <div className="flex justify-between">

                  <h3 className="font-bold text-xl">
                    {item.guestName}
                  </h3>

                  <span className={`text-white px-3 py-1 rounded-full ${badgeColor(item.sentiment)}`}>
                    {item.sentiment}
                  </span>

                </div>

                <p className="mt-4">{item.review}</p>
                {item.aiSentiment && (
  <p className="mt-3">
    <strong>AI Sentiment:</strong> {item.aiSentiment}
  </p>
)}

{item.theme && (
  <p>
    <strong>Theme:</strong> {item.theme}
  </p>
)}

{item.response && (
  <div className="mt-3 bg-gray-100 p-3 rounded-lg">
    <strong>AI Response:</strong>
    <p className="mt-1">{item.response}</p>
  </div>
)}

                <p className="text-xs mt-4 text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </p>

                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() => editReview(item)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteReview(item._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
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
    </ProtectedRoute>
  );
}