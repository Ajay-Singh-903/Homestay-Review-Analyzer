"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Toast from "@/components/ui/Toast";

import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = async () => {
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login Successful!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      console.error(error);
      alert(error.message);
      toast.error("Backend connection failed.");
    }

    setLoading(false);
  };

  const googleLogin = () => {
    signIn("google", {
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-5 py-12 sm:px-8">

        {/* Background decoration */}
        <div className="absolute left-0 top-32 h-48 w-48 rounded-full bg-green-200/30 blur-3xl" />
        <div className="absolute bottom-20 right-0 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />

        {/* Login Card */}
        <div className="relative w-full max-w-md">

          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white/95 shadow-2xl backdrop-blur">

            {/* Header */}
            <div className="bg-gradient-to-r from-green-700 to-emerald-600 px-8 py-10 text-center text-white">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-4xl shadow-lg backdrop-blur">
                🏡
              </div>

              <h1 className="mt-5 text-3xl font-extrabold">
                Welcome Back
              </h1>

              <p className="mt-2 text-sm text-green-50">
                Sign in to continue analyzing your guest reviews
              </p>

            </div>

            {/* Form */}
            <div className="p-7 sm:p-8">

              {/* Email */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                    ✉️
                  </span>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-800 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Password
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                    🔒
                  </span>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-800 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                onClick={loginUser}
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-green-700 to-emerald-600 py-3.5 font-bold text-white shadow-lg shadow-green-200 transition duration-200 hover:-translate-y-0.5 hover:from-green-800 hover:to-emerald-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Logging In...
                  </span>
                ) : (
                  "Login"
                )}
              </button>

              {/* Divider */}
              <div className="my-7 flex items-center">
                <div className="h-px flex-1 bg-gray-200" />

                <span className="px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Or continue with
                </span>

                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Google Login */}
              <button
                onClick={googleLogin}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3.5 font-semibold text-gray-700 transition duration-200 hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-md"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="h-5 w-5"
                />

                Sign in with Google
              </button>

              {/* Register */}
              <p className="mt-7 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <button
                  onClick={() => router.push("/register")}
                  className="font-bold text-green-700 transition hover:text-green-900 hover:underline"
                >
                  Create an account
                </button>
              </p>

            </div>
          </div>

          {/* Small bottom text */}
          <p className="mt-5 text-center text-xs text-gray-400">
            🔐 Your account information is securely protected
          </p>

        </div>
      </main>

      <Toast />

      <Footer />
    </div>
  );
}