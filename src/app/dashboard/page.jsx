"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState, useEffect, useCallback, useMemo } from "react";
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [aiResult, setAiResult] = useState("");
  const [aiSentiment, setAiSentiment] = useState("");
const [aiTheme, setAiTheme] = useState("");
const [aiResponse, setAiResponse] = useState("");
const totalReviews = reviews.length;

const statistics = useMemo(() => {
  return {
    positive: reviews.filter(
      (item) => item.sentiment === "Positive"
    ).length,

    negative: reviews.filter(
      (item) => item.sentiment === "Negative"
    ).length,

    neutral: reviews.filter(
      (item) => item.sentiment === "Neutral"
    ).length,
  };
}, [reviews]);

 

const fetchReviews = useCallback(async () => {
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
 }, [router]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchReviews();
  }, [fetchReviews, router]);

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
console.log("AI Response:", data);
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
    if (!guestName.trim()) {
  toast.error("Guest name is required");
  return;
}

if (guestName.trim().length < 3) {
  toast.error("Guest name should contain at least 3 characters");
  return;
}

if (!review.trim()) {
  toast.error("Review cannot be empty");
  return;
}

if (review.trim().length < 10) {
  toast.error("Please write a more detailed review");
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

  const deleteReview = (id) => {
  setSelectedReviewId(id);
  setShowDeleteModal(true);
};
const confirmDelete = useCallback(async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/reviews/${selectedReviewId}`,
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

    setShowDeleteModal(false);
    setSelectedReviewId(null);

    fetchReviews();

  } catch {
    toast.error("Delete Failed");
  }
}, [selectedReviewId, fetchReviews]);

 const editReview = useCallback((item) => { 
    setEditingId(item._id);
    setGuestName(item.guestName);
    setReview(item.review);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
 }, []);

const badgeColor = useCallback((sentiment) => {
    switch (sentiment) {
      case "Positive":
        return "bg-green-600";
      case "Negative":
        return "bg-red-600";
      case "Neutral":
        return "bg-yellow-600";
      default:
        return "bg-gray-500";
    }
 }, []);
  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-6 sm:px-6 lg:px-8">

        <div className="bg-white shadow-lg rounded-xl p-5 sm:p-6 lg:p-8">

          <h1 className="text-3xl sm:text-4xl font-bold text-green-700">
            Homestay Review Dashboard
          </h1>

          <p className="text-gray-600 mt-2 mb-6">
            Analyze guest reviews and manage all reviews.
          </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">

  <div className="bg-blue-600 text-white rounded-xl p-5 shadow-lg">
    <h3 className="text-lg font-semibold">Total Reviews</h3>
    <p className="text-4xl font-bold mt-2">{totalReviews}</p>
  </div>

  <div className="bg-green-600 text-white rounded-xl p-5 shadow-lg">
    <h3 className="text-lg font-semibold">Positive</h3>
    <p className="text-4xl font-bold mt-2">{statistics.positive}</p>
  </div>

  <div className="bg-red-600 text-white rounded-xl p-5 shadow-lg">
    <h3 className="text-lg font-semibold">Negative</h3>
    <p className="text-4xl font-bold mt-2">{statistics.negative}</p>
  </div>

  <div className="bg-yellow-500 text-white rounded-xl p-5 shadow-lg">
    <h3 className="text-lg font-semibold">Neutral</h3>
    <p className="text-4xl font-bold mt-2">{statistics.neutral}</p>
  </div>

</div>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">

            <input
              type="text"
              placeholder="Search..."
              className="flex-1 border rounded-lg p-3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              onClick={searchReviews}
              className="bg-blue-600 text-white px-5 py-3 rounded-lg w-full sm:w-auto hover:bg-blue-700 transition"
            >
              Search
            </button>

            <button
              onClick={fetchReviews}
              className="bg-gray-700 text-white px-5 py-3 rounded-lg w-full sm:w-auto hover:bg-gray-800 transition"
            >
              Reset
            </button>

          </div>

        <input
  className="border rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-green-500 outline-none"
  placeholder="Guest Name"
  maxLength={50}
  value={guestName}
  onChange={(e) => setGuestName(e.target.value)}
/>
          <textarea
  rows={6}
  className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
  placeholder="Write your review..."
  maxLength={500}
  value={review}
  onChange={(e) => setReview(e.target.value)}
/>
<div className="flex justify-end mt-2">
  <span className="text-sm text-gray-500">
    {review.length}/500
  </span>
</div>

        <div className="flex gap-4 mt-5">

  <button
    onClick={analyzeWithAI}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
  >
    Analyze with AI
  </button>

  <button
    onClick={submitReview}
    className="mt-5 bg-green-700 text-white px-6 py-3 rounded-lg"
  >
    {editingId ? "Update Review" : "Save Review"}
  </button>

</div>
          {loading && (
  <div className="mt-6 text-center">

    <Loader />

    <p className="mt-3 text-green-700 font-medium animate-pulse">
      AI is analyzing your review...
    </p>

  </div>
)}
  {aiResult && (
  <div className="mt-6 bg-white rounded-xl shadow-lg border p-6">

    <h2 className="text-2xl font-bold text-blue-700 mb-6">
      🤖 AI Review Analysis
    </h2>

    <div className="mb-5">
      <h3 className="font-semibold text-lg text-green-600">
        😊 Sentiment
      </h3>

      <p className="mt-2 bg-green-50 p-3 rounded-lg border">
        {aiSentiment}
      </p>
    </div>

    <div className="mb-5">
      <h3 className="font-semibold text-lg text-purple-600">
        🏷 Theme
      </h3>

      <p className="mt-2 bg-purple-50 p-3 rounded-lg border">
        {aiTheme}
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-lg text-blue-600">
        💬 AI Response
      </h3>

      <p className="mt-2 bg-blue-50 p-4 rounded-lg border whitespace-pre-wrap">
        {aiResponse}
      </p>
    </div>

  </div>
)}

        </div>

        <div className="mt-10">

          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            All Reviews ({reviews.length})
          </h2>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

  {reviews.length === 0 ? (

    <div className="col-span-full bg-white rounded-xl shadow-lg p-10 text-center">

      <h2 className="text-2xl font-bold text-gray-700">
        📭 No Reviews Found
      </h2>

      <p className="text-gray-500 mt-3">
        Add your first guest review to start analyzing sentiments.
      </p>

    </div>

  ) : (

    reviews.map((item) => (

      <div
        key={item._id}
        className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      >
<div
  key={item._id}
  className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
>
  <div className="flex justify-between items-center">

    <h3 className="text-xl font-bold text-gray-800">
      👤 {item.guestName}
    </h3>

    <span
      className={`text-white px-3 py-1 rounded-full ${badgeColor(
        item.sentiment
      )}`}
    >
      {item.sentiment}
    </span>

  </div>

  <div className="mt-5">

   <h4 className="font-semibold text-green-700">
  🏷 Theme
</h4>

<div className="mt-2 inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
  {item.theme || "Not Available"}
</div>

  </div>

  <div className="mt-5">

    <h4 className="font-semibold text-blue-700 flex items-center gap-2">
  🤖 AI Response
</h4>

<div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-4 mt-3 shadow-sm">

  {item.response ? (
    <p className="text-gray-700 leading-7 whitespace-pre-wrap">
      {item.response}
    </p>
  ) : (
    <p className="text-gray-400 italic">
      No AI response available.
    </p>
  )}

</div>

  </div>

  <div className="mt-5">

    <h4 className="font-semibold text-purple-700">
      📝 Guest Review
    </h4>

    <p className="mt-2 text-gray-700">
      {item.review}
    </p>

  </div>

  <p className="text-xs text-gray-500 mt-5">
    {new Date(item.createdAt).toLocaleString()}
  </p>

  <div className="flex flex-col sm:flex-row gap-3 mt-5">

    <button
      onClick={() => editReview(item)}
      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-full"
    >
      Edit
    </button>

    <button
      onClick={() => deleteReview(item._id)}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
    >
      Delete
    </button>

  </div>

</div>
      </div>

    ))

  )}

</div>


        </div>

      </main>
{showDeleteModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-xl p-8 w-[90%] max-w-md shadow-xl">

      <h2 className="text-2xl font-bold text-gray-800">
        Delete Review?
      </h2>

      <p className="mt-4 text-gray-600">
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-4 mt-8">

        <button
          onClick={() => setShowDeleteModal(false)}
          className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>

        <button
          onClick={confirmDelete}
          className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>

      </div>

    </div>

  </div>
)}
      <Toast />
      <Footer />
    </div>
    </ProtectedRoute>
  );
}