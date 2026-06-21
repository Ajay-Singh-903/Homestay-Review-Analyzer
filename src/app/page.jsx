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
          Homestay Review Analyzer helps the staff understand the
          guest feedback using AI.
        </p>
      </main>

      <Footer />
    </>
  );
}