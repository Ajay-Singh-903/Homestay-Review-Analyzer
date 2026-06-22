import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow p-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-4">
            Login
          </h1>

          <input
            type="email"
            placeholder="Email"
            className="border w-full p-3 mb-3 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            className="border w-full p-3 mb-3 rounded"
          />

          <button className="bg-green-700 text-white px-5 py-2 rounded">
            Login
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}