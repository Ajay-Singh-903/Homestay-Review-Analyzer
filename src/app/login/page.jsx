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
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-8">

        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center text-green-700 mb-2">
            Welcome Back
          </h1>

          <p className="text-center text-gray-500 mb-6">
            Login to continue
          </p>

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
            onClick={loginUser}
            disabled={loading}
            className="bg-green-700 hover:bg-green-800 text-white w-full py-3 rounded-lg font-semibold"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          <div className="flex items-center my-6">
            <hr className="flex-1" />
            <span className="mx-3 text-gray-500 text-sm">OR</span>
            <hr className="flex-1" />
          </div>

          <button
            onClick={googleLogin}
            className="border border-gray-300 hover:bg-gray-100 w-full py-3 rounded-lg font-semibold flex justify-center items-center gap-3"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>

        </div>

      </main>

      <Toast />
      <Footer />
    </div>
  );
}