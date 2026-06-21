import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      <Navbar />

      <main className="p-10">
        <h1 className="text-3xl font-bold">
          Welcome to the Homestay Review Analyzer
        </h1>

        <p className="mt-4">
            Transform guest feedback into actionable insights with AI.
            Analyze reviews instantly, detect sentiment, identify key themes,
            and generate professional responses to improve guest satisfaction
            and enhance the overall homestay experience.
        </p>
      </main>

      <Footer />
    </>
  );
}