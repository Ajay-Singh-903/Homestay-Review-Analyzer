"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "../components/ui/Button";
import Toast from "../components/ui/Toast";
import toast from "react-hot-toast";

export default function About() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white text-gray-900">
      <Navbar />

      {/* HERO SECTION */}
      <main>
        <section className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />
          <div className="absolute top-72 -left-24 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:flex lg:min-h-[650px] lg:items-center lg:gap-16 lg:px-12">
            
            {/* LEFT CONTENT */}
            <div className="max-w-3xl lg:w-1/2">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-medium text-green-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                AI-Powered Review Intelligence
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Turn Guest Reviews Into{" "}
                <span className="text-green-700">
                  Actionable Insights
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                Understand what your guests really think. Analyze reviews,
                detect sentiment, identify important themes, and generate
                professional responses with AI.
              </p>

              {/* BUTTONS */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => router.push("/register")}
                  className="rounded-xl bg-green-700 px-7 py-3.5 font-semibold text-white shadow-lg shadow-green-700/20 transition hover:-translate-y-0.5 hover:bg-green-800"
                >
                  Get Started Free →
                </button>

                <button
                  onClick={() => router.push("/login")}
                  className="rounded-xl border border-gray-300 bg-white px-7 py-3.5 font-semibold text-gray-700 transition hover:border-green-600 hover:text-green-700"
                >
                  Login
                </button>
              </div>

              <p className="mt-5 text-sm text-gray-500">
                Built for homestay owners who want to understand their guests
                better.
              </p>
            </div>

            {/* RIGHT ANALYTICS CARD */}
            <div className="mt-14 lg:mt-0 lg:w-1/2">
              <div className="relative mx-auto max-w-lg">
                
                {/* Main card */}
                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl shadow-green-900/10">
                  
                  <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                    <div>
                      <p className="text-sm text-gray-500">
                        Review Analysis
                      </p>
                      <h2 className="mt-1 text-xl font-bold text-gray-900">
                        Guest Feedback
                      </h2>
                    </div>

                    <div className="rounded-xl bg-green-100 px-3 py-2 text-sm font-semibold text-green-700">
                      AI ✨
                    </div>
                  </div>

                  {/* Review */}
                  <div className="mt-6 rounded-2xl bg-gray-50 p-4">
                    <p className="text-sm leading-6 text-gray-600">
                      "The room was extremely clean and comfortable. The host
                      was very friendly and helpful throughout our stay."
                    </p>
                  </div>

                  {/* Analysis */}
                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
                      <p className="text-xs font-medium text-gray-500">
                        Sentiment
                      </p>
                      <p className="mt-2 font-bold text-green-700">
                        Positive 😊
                      </p>
                    </div>

                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                      <p className="text-xs font-medium text-gray-500">
                        Main Theme
                      </p>
                      <p className="mt-2 font-bold text-blue-700">
                        Cleanliness
                      </p>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="mt-4 rounded-2xl border border-purple-100 bg-purple-50 p-4">
                    <p className="text-xs font-medium text-purple-600">
                      AI Generated Response
                    </p>

                    <p className="mt-2 text-sm leading-6 text-gray-700">
                      "Thank you for your wonderful feedback! We're delighted
                      that you enjoyed the cleanliness and comfort of your
                      stay."
                    </p>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-6 -left-6 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-xl">
                  <p className="text-xs text-gray-500">
                    Reviews analyzed
                  </p>
                  <p className="text-2xl font-bold text-green-700">
                    1,250+
                  </p>
                </div>

                {/* Floating sentiment badge */}
                <div className="absolute -right-5 -top-5 rounded-2xl bg-gray-900 px-5 py-4 text-white shadow-xl">
                  <p className="text-xs text-gray-400">
                    Overall Sentiment
                  </p>
                  <p className="mt-1 font-bold">
                    92% Positive
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="border-y border-gray-100 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-semibold text-green-700">
                POWERFUL FEATURES
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                Everything you need to understand guest feedback
              </h2>

              <p className="mt-4 text-gray-600">
                Manage reviews and turn unstructured feedback into useful
                information.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              
              <FeatureCard
                icon="🤖"
                title="AI Analysis"
                description="Analyze guest reviews and get meaningful insights instantly."
              />

              <FeatureCard
                icon="😊"
                title="Sentiment Detection"
                description="Automatically identify whether guest feedback is positive or negative."
              />

              <FeatureCard
                icon="🔍"
                title="Smart Search"
                description="Quickly find reviews using keywords and search."
              />

              <FeatureCard
                icon="💬"
                title="AI Responses"
                description="Generate professional responses to guest feedback."
              />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
            <div className="text-center">
              <p className="font-semibold text-green-700">
                HOW IT WORKS
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                Analyze reviews in three simple steps
              </h2>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              
              <StepCard
                number="01"
                title="Add a Review"
                description="Enter your guest's review into the application."
              />

              <StepCard
                number="02"
                title="Let AI Analyze"
                description="Our AI analyzes sentiment and identifies important themes."
              />

              <StepCard
                number="03"
                title="Take Action"
                description="Use the insights and AI-generated response to improve guest experience."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-green-700">
          <div className="mx-auto max-w-5xl px-6 py-20 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to understand your guests better?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-green-100">
              Start analyzing your homestay reviews and turn guest feedback
              into meaningful improvements.
            </p>

            <button
              onClick={() => router.push("/register")}
              className="mt-8 rounded-xl bg-white px-8 py-3.5 font-bold text-green-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-green-50"
            >
              Start Analyzing Reviews →
            </button>
          </div>
        </section>
      </main>

      <Toast />
      <Footer />
    </div>
  );
}

/* FEATURE CARD */

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl transition group-hover:bg-green-700">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {description}
      </p>
    </div>
  );
}

/* STEP CARD */

function StepCard({ number, title, description }) {
  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <span className="text-sm font-bold text-green-700">
        {number}
      </span>

      <h3 className="mt-4 text-xl font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-gray-600">
        {description}
      </p>
    </div>
  );
}