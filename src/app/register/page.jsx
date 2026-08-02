"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Toast from "@/components/ui/Toast";

import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const registerUser = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          toast.error(data.errors[0].msg);
        } else {
          toast.error(data.message);
        }

        setLoading(false);
        return;
      }

      toast.success("Registration Successful!");

      setTimeout(() => {
        router.push("/login");
      }, 1000);

    } catch (error) {
      console.error(error);
      toast.error("Backend connection failed.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-8">

        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center text-green-700 mb-2">
            Create Account
          </h1>

          <p className="text-center text-gray-500 mb-6">
            Register to access the Homestay Review Analyzer
          </p>
          <input
  type="text"
  placeholder="Enter Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="border w-full p-3 mb-4 rounded-lg"
/>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full p-3 mb-4 rounded-lg"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border w-full p-3 mb-5 rounded-lg"
          />

          <button
            onClick={registerUser}
            disabled={loading}
            className="bg-green-700 hover:bg-green-800 text-white w-full py-3 rounded-lg font-semibold"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <p className="text-center mt-5 text-sm">
            Already have an account?{" "}
            <span
              className="text-green-700 cursor-pointer font-semibold"
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </p>

        </div>

      </main>

      <Toast />
      <Footer />
    </div>
  );
}