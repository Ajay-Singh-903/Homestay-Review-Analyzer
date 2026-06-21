import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Login() {
  return (
    <>
      <Navbar />

      <main className="p-10 max-w-md mx-auto">
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
      </main>

      <Footer />
    </>
  );
}