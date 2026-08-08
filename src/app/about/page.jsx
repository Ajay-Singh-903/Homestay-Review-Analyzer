import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function About() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
        <Navbar />

        <main className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">

          {/* HERO */}
          <section className="relative overflow-hidden rounded-3xl bg-green-700 px-8 py-16 text-white shadow-xl sm:px-12 lg:px-16">
            
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-500/40 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />

            <div className="relative max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                🏡 About Our Platform
              </div>

              <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
                Making Guest Feedback
                <span className="block text-green-200">
                  More Meaningful
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-green-50">
                Homestay Review Analyzer helps homestay owners understand
                guest feedback, identify important issues, and respond to
                reviews more effectively using Artificial Intelligence.
              </p>
            </div>
          </section>

          {/* ABOUT */}
          <section className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">

            <div>
              <p className="font-semibold uppercase tracking-wider text-green-700">
                About the Project
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900">
                Understand what your guests really think
              </h2>

              <p className="mt-5 leading-8 text-gray-600">
                Homestay Review Analyzer is an AI-powered platform designed
                to help homestay owners and staff understand guest feedback
                more effectively.
              </p>

              <p className="mt-4 leading-8 text-gray-600">
                The platform analyzes guest reviews and converts unstructured
                feedback into useful insights that can help businesses improve
                their services and overall customer satisfaction.
              </p>
            </div>

            {/* STATS CARD */}
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900">
                What the platform analyzes
              </h3>

              <div className="mt-6 grid grid-cols-2 gap-4">

                <InfoCard
                  icon="😊"
                  title="Sentiment"
                  text="Positive, Neutral & Negative"
                />

                <InfoCard
                  icon="🏷️"
                  title="Themes"
                  text="Food, Host, Location & more"
                />

                <InfoCard
                  icon="💬"
                  title="Responses"
                  text="Professional AI-generated replies"
                />

                <InfoCard
                  icon="🚨"
                  title="Priority Alerts"
                  text="Identify critical negative feedback"
                />

              </div>
            </div>
          </section>

          {/* AI SECTION */}
          <section className="mt-20 rounded-3xl border border-green-100 bg-white p-8 shadow-lg sm:p-12">

            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-3xl">
                  🤖
                </div>

                <h2 className="mt-6 text-3xl font-bold text-gray-900">
                  Powered by Artificial Intelligence
                </h2>

                <p className="mt-5 leading-8 text-gray-600">
                  The system automatically analyzes reviews and identifies
                  patterns that may otherwise take significant time to find
                  manually.
                </p>

                <p className="mt-4 leading-8 text-gray-600">
                  It can classify sentiment, identify important themes, and
                  generate professional responses that help management respond
                  quickly to their guests.
                </p>
              </div>

              {/* AI FLOW */}
              <div className="rounded-2xl bg-gray-50 p-6">

                <div className="space-y-4">

                  <FlowItem
                    number="01"
                    title="Guest Review"
                    description="Guest submits feedback"
                  />

                  <FlowItem
                    number="02"
                    title="AI Analysis"
                    description="Sentiment and themes are detected"
                  />

                  <FlowItem
                    number="03"
                    title="Actionable Insight"
                    description="Management receives useful insights"
                  />

                  <FlowItem
                    number="04"
                    title="AI Response"
                    description="A professional response can be generated"
                  />

                </div>
              </div>
            </div>
          </section>

          {/* THEMES */}
          <section className="mt-20 text-center">

            <p className="font-semibold uppercase tracking-wider text-green-700">
              Key Areas
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Understand every part of the guest experience
            </h2>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

              <ThemeCard icon="🍽️" title="Food" />
              <ThemeCard icon="🤝" title="Host" />
              <ThemeCard icon="📍" title="Location" />
              <ThemeCard icon="✨" title="Cleanliness" />
              <ThemeCard icon="⭐" title="Experience" />

            </div>
          </section>

          {/* MISSION */}
          <section className="mt-20 rounded-3xl bg-gray-900 px-8 py-14 text-center text-white sm:px-12">

            <div className="mx-auto max-w-3xl">

              <p className="font-semibold text-green-400">
                OUR GOAL
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Better feedback. Better decisions. Better guest experiences.
              </h2>

              <p className="mt-5 leading-8 text-gray-300">
                By turning guest reviews into structured insights, the
                platform helps homestay businesses respond faster and make
                informed decisions to improve their services.
              </p>

            </div>
          </section>

        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}


/* -----------------------------
   INFO CARD
----------------------------- */

function InfoCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md">
      <div className="text-2xl">{icon}</div>

      <h3 className="mt-3 font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-5 text-gray-500">
        {text}
      </p>
    </div>
  );
}


/* -----------------------------
   AI FLOW ITEM
----------------------------- */

function FlowItem({ number, title, description }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
        {number}
      </div>

      <div>
        <h3 className="font-semibold text-gray-900">
          {title}
        </h3>

        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>

    </div>
  );
}


/* -----------------------------
   THEME CARD
----------------------------- */

function ThemeCard({ icon, title }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg">

      <div className="text-3xl">
        {icon}
      </div>

      <h3 className="mt-3 font-semibold text-gray-900">
        {title}
      </h3>

    </div>
  );
}