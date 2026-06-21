import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="p-10">
        <h1 className="text-3xl font-bold">
          Review Dashboard
        </h1>

        <textarea
          className="border w-full p-4 mt-4 rounded"
          rows="8"
          placeholder="Paste guest reviews here..."
        />

        <button className="bg-green-700 text-white px-5 py-2 rounded mt-4">
          Analyze Reviews
        </button>
      </main>

      <Footer />
    </>
  );
}