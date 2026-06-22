"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";
import Toast from "../components/ui/Toast";
import Modal from "../components/ui/Modal";

import toast from "react-hot-toast";

export default function About() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow p-10 space-y-4">
        <h1 className="text-3xl font-bold">
          Welcome to the Homestay Review Analyzer
        </h1>

        <p>
          Transform guest feedback into actionable insights with AI.
          Analyze reviews instantly, detect sentiment, identify key themes,
          and generate professional responses.
        </p>

        <Input
          label="Review"
          placeholder="Enter review here"
        />

        <Button
          variant="primary"
          size="md"
          onClick={() => setOpen(true)}
        >
          Analyze Reviews
        </Button>

        <Loader />

        <Toast />

        <button
          onClick={() =>
            toast.success("Review Analyzed Successfully")
          }
          className="bg-green-600 px-4 py-2 rounded text-white"
        >
          Show Toast
        </button>

        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Review Analysis"
        >
          <p>
            <strong>Sentiment:</strong> Positive
          </p>

          <p>
            <strong>Theme:</strong> Cleanliness
          </p>

          <p>
            <strong>AI Response:</strong> Thank you for your feedback.
          </p>
        </Modal>
      </main>

      <Footer />
    </div>
  );
}