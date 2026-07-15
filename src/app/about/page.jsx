import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function About() {
  return (
    <ProtectedRoute>
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow p-10">
        <h1 className="text-3xl font-bold text-green-800">
          About Homestay Review Analyzer
        </h1>

        <p className="mt-4 text-gray-700">
          Homestay Review Analyzer is an AI-powered platform designed to help
          homestay owners and staff understand guest feedback more effectively.
          The system analyzes reviews from different platforms and provides
          valuable insights to improve customer satisfaction.
        </p>

        <p className="mt-4 text-gray-700">
          Using Artificial Intelligence, the application automatically classifies
          reviews as Positive, Neutral, or Negative, identifies key themes such
          as Food, Host, Location, Cleanliness, and Experience, and generates
          professional management responses.
        </p>

        <p className="mt-4 text-gray-700">
          The platform also includes features like priority alerts for highly
          negative reviews and support for multilingual reviews, helping
          homestay businesses respond quickly and enhance guest experiences.
        </p>
      </main>

      <Footer />
    </div>
    </ProtectedRoute>
  );
}