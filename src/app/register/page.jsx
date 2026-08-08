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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">

        <div className="w-full max-w-md">

          {/* Registration Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100 p-6 sm:p-8">

            {/* Logo / Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center shadow-lg">
                <span className="text-3xl">🏡</span>
              </div>
            </div>

            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Create Account
              </h1>

              <p className="text-gray-500 mt-2 text-sm sm:text-base">
                Join Homestay Review Analyzer today
              </p>
            </div>

            {/* Name */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  👤
                </span>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all duration-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  ✉️
                </span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all duration-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  🔒
                </span>

                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all duration-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Register Button */}
            <button
              onClick={registerUser}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-800 hover:to-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-green-200 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-7">
              <div className="flex-1 h-px bg-gray-200"></div>

              <span className="text-xs text-gray-400 uppercase">
                Already registered?
              </span>

              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}

              <button
                onClick={() => router.push("/login")}
                className="text-green-700 font-bold hover:text-green-800 hover:underline transition"
              >
                Login
              </button>
            </p>

          </div>

          {/* Security message */}
          <p className="text-center text-xs text-gray-400 mt-6">
            🔒 Your account information is securely handled.
          </p>

        </div>
      </main>

      <Toast />
      <Footer />
    </div>
  );
}

