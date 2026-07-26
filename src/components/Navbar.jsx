"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    if (session) {
      await signOut({
        callbackUrl: "/login",
      });
      return;
    }

    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="bg-green-700 dark:bg-gray-900 text-white px-4 py-4">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-center md:text-left">
          Homestay Review Analyzer
        </h1>

        {/* Menu */}
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-3">

          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>

          <Link href="/about" className="hover:text-gray-300">
            About
          </Link>

          <Link href="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>

          {!user && !session && (
            <>
              <Link href="/login" className="hover:text-gray-300">
                Login
              </Link>

              <Link href="/register" className="hover:text-gray-300">
                Register
              </Link>
            </>
          )}

          {(user || session) && (
            <>
              <span className="text-sm break-all max-w-[150px] text-center">
                {session?.user?.name ||
                  user?.name ||
                  user?.email}
              </span>

              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}

          <ThemeToggle />

        </div>
      </div>
    </nav>
  );
}