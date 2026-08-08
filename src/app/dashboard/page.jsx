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
  `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`,
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/search?q=${search}`,
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/ai/analyze`,
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
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${editingId}`
  : `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`;

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
  `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${selectedReviewId}`,
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-green-50">
      <Navbar />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* HERO HEADER */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-800 via-emerald-700 to-teal-700 text-white shadow-2xl mb-8">
          
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-24 -left-16 w-72 h-72 bg-green-400/10 rounded-full blur-3xl" />

          <div className="relative p-7 sm:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              <div>
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-4">
                  <span>🤖</span>
                  <span>AI-Powered Review Management</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                  Homestay Review
                  <span className="block text-green-200">
                    Dashboard
                  </span>
                </h1>

                <p className="mt-4 text-green-50 max-w-2xl text-sm sm:text-base leading-7">
                  Analyze guest feedback, understand sentiment, discover themes,
                  and generate professional AI-powered responses.
                </p>
              </div>

              <div className="hidden lg:flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl">
                  <span className="text-6xl">🏡</span>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* STATISTICS */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">

          {/* Total */}
          <div className="group bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Reviews
                </p>

                <p className="text-3xl sm:text-4xl font-extrabold text-slate-800 mt-2">
                  {totalReviews}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                📊
              </div>
            </div>

            <div className="mt-4 h-1 bg-blue-100 rounded-full overflow-hidden">
              <div className="h-full w-full bg-blue-500 rounded-full" />
            </div>
          </div>


          {/* Positive */}
          <div className="group bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Positive
                </p>

                <p className="text-3xl sm:text-4xl font-extrabold text-green-600 mt-2">
                  {statistics.positive}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                😊
              </div>
            </div>

            <div className="mt-4 h-1 bg-green-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full w-full" />
            </div>
          </div>


          {/* Negative */}
          <div className="group bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Negative
                </p>

                <p className="text-3xl sm:text-4xl font-extrabold text-red-600 mt-2">
                  {statistics.negative}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-2xl">
                😞
              </div>
            </div>

            <div className="mt-4 h-1 bg-red-100 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full w-full" />
            </div>
          </div>


          {/* Neutral */}
          <div className="group bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Neutral
                </p>

                <p className="text-3xl sm:text-4xl font-extrabold text-yellow-600 mt-2">
                  {statistics.neutral}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-2xl">
                😐
              </div>
            </div>

            <div className="mt-4 h-1 bg-yellow-100 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 rounded-full w-full" />
            </div>
          </div>

        </section>


        {/* SEARCH */}
        <section className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 sm:p-6 mb-8">

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
              🔎
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Search Reviews
              </h2>

              <p className="text-sm text-slate-500">
                Find a specific guest review
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            <input
              type="text"
              placeholder="Search reviews..."
              className="flex-1 border border-slate-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-slate-50 focus:bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              onClick={searchReviews}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              🔍 Search
            </button>

            <button
              onClick={fetchReviews}
              className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              ↻ Reset
            </button>

          </div>
        </section>


        {/* ADD / EDIT REVIEW */}
        <section className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-10">

          <div className="bg-gradient-to-r from-green-700 to-emerald-600 px-6 sm:px-8 py-6 text-white">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm">
                {editingId ? "✏️" : "📝"}
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {editingId ? "Edit Review" : "Add Guest Review"}
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  {editingId
                    ? "Update the guest review details below."
                    : "Enter guest feedback and use AI to analyze it."}
                </p>
              </div>

            </div>
          </div>


          <div className="p-6 sm:p-8">

            {/* Guest Name */}
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Guest Name
            </label>

            <input
              className="border border-slate-200 rounded-xl p-3.5 w-full mb-5 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-slate-50 focus:bg-white"
              placeholder="Enter guest name"
              maxLength={50}
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />


            {/* Review */}
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700">
                Guest Review
              </label>

              <span className="text-xs text-slate-400">
                {review.length}/500
              </span>
            </div>

            <textarea
              rows={6}
              className="border border-slate-200 rounded-xl p-4 w-full outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-slate-50 focus:bg-white resize-none"
              placeholder="Write the guest review here..."
              maxLength={500}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />


            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">

              <button
                onClick={analyzeWithAI}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                🤖 Analyze with AI
              </button>

              <button
                onClick={submitReview}
                className="flex-1 bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-800 hover:to-emerald-700 text-white px-6 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                {editingId ? "✏️ Update Review" : "💾 Save Review"}
              </button>

            </div>

          </div>
        </section>


        {/* LOADING */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-8">

            <Loader />

            <p className="mt-4 text-green-700 font-semibold animate-pulse">
              🤖 AI is analyzing your review...
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Please wait while we generate insights.
            </p>

          </div>
        )}


        {/* AI RESULT */}
        {aiResult && (
          <section className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-10">

            <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 p-6 sm:p-8 text-white">

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-sm">
                  🤖
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    AI Review Analysis
                  </h2>

                  <p className="text-indigo-100 text-sm mt-1">
                    Intelligent insights generated from your guest review
                  </p>
                </div>
              </div>

            </div>


            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-5">

              {/* Sentiment */}
              <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5">

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">😊</span>

                  <h3 className="font-bold text-lg text-green-700">
                    Sentiment
                  </h3>
                </div>

                <p className="bg-white/70 p-4 rounded-xl border border-green-100 text-slate-700 font-medium">
                  {aiSentiment}
                </p>

              </div>


              {/* Theme */}
              <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 p-5">

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🏷️</span>

                  <h3 className="font-bold text-lg text-purple-700">
                    Theme
                  </h3>
                </div>

                <p className="bg-white/70 p-4 rounded-xl border border-purple-100 text-slate-700 font-medium">
                  {aiTheme}
                </p>

              </div>


              {/* Response */}
              <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-5">

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">💬</span>

                  <h3 className="font-bold text-lg text-blue-700">
                    AI Response
                  </h3>
                </div>

                <p className="bg-white/70 p-4 rounded-xl border border-blue-100 text-slate-700 leading-7 whitespace-pre-wrap">
                  {aiResponse}
                </p>

              </div>

            </div>

          </section>
        )}


        {/* ALL REVIEWS */}
        <section>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                Guest Reviews
              </h2>

              <p className="text-slate-500 mt-1">
                Manage and analyze your collected guest feedback.
              </p>
            </div>

            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
              {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
            </div>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {reviews.length === 0 ? (

              <div className="col-span-full bg-white rounded-3xl shadow-lg border border-slate-100 p-10 sm:p-14 text-center">

                <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-4xl mb-5">
                  📭
                </div>

                <h2 className="text-2xl font-bold text-slate-700">
                  No Reviews Found
                </h2>

                <p className="text-slate-500 mt-3 max-w-md mx-auto">
                  Add your first guest review to start analyzing sentiments
                  and generating AI-powered responses.
                </p>

              </div>

            ) : (

              reviews.map((item) => (

                <div
                  key={item._id}
                  className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >

                  {/* Card Header */}
                  <div className="flex justify-between items-start gap-3">

                    <div className="flex items-center gap-3 min-w-0">

                      <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center text-xl shrink-0">
                        👤
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-slate-800 truncate">
                          {item.guestName}
                        </h3>

                        <p className="text-xs text-slate-400">
                          Guest
                        </p>
                      </div>

                    </div>

                    <span
                      className={`text-white text-xs sm:text-sm px-3 py-1.5 rounded-full font-semibold shadow-sm whitespace-nowrap ${badgeColor(
                        item.sentiment
                      )}`}
                    >
                      {item.sentiment}
                    </span>

                  </div>


                  {/* Theme */}
                  <div className="mt-6">

                    <h4 className="font-semibold text-sm text-slate-600 flex items-center gap-2">
                      🏷️ Theme
                    </h4>

                    <div className="mt-2 inline-block bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-full font-medium text-sm">
                      {item.theme || "Not Available"}
                    </div>

                  </div>


                  {/* Review */}
                  <div className="mt-6">

                    <h4 className="font-semibold text-sm text-slate-600 flex items-center gap-2">
                      📝 Guest Review
                    </h4>

                    <div className="mt-2 bg-slate-50 border border-slate-100 rounded-xl p-4">
                      <p className="text-slate-700 leading-6">
                        {item.review}
                      </p>
                    </div>

                  </div>


                  {/* AI Response */}
                  <div className="mt-5">

                    <h4 className="font-semibold text-sm text-blue-700 flex items-center gap-2">
                      🤖 AI Response
                    </h4>

                    <div className="bg-gradient-to-br from-blue-50 to-green-50 border border-blue-100 rounded-xl p-4 mt-2">

                      {item.response ? (
                        <p className="text-slate-700 text-sm leading-6 whitespace-pre-wrap">
                          {item.response}
                        </p>
                      ) : (
                        <p className="text-slate-400 italic text-sm">
                          No AI response available.
                        </p>
                      )}

                    </div>

                  </div>


                  {/* Date */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400">
                      🕒 {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>


                  {/* Actions */}
                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={() => editReview(item)}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2.5 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => deleteReview(item._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </section>

      </main>


      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-3xl p-7 sm:p-8 w-full max-w-md shadow-2xl">

            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-2xl mb-5">
              🗑️
            </div>

            <h2 className="text-2xl font-bold text-slate-800">
              Delete Review?
            </h2>

            <p className="mt-3 text-slate-500 leading-6">
              This action cannot be undone. Are you sure you want to permanently
              delete this review?
            </p>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">

              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition shadow-md"
              >
                Delete Review
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