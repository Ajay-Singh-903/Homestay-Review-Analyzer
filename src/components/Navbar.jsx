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
    <nav className="bg-green-700 dark:bg-gray-900 text-white px-6 py-4 flex justify-between items-center">

      <h1 className="text-xl font-bold">
        Homestay Review Analyzer
      </h1>

      <div className="flex items-center gap-5">

        <Link href="/">Home</Link>

        <Link href="/about">About</Link>

        <Link href="/dashboard">Dashboard</Link>

        {!user && !session && (
          <>
            <Link href="/login">Login</Link>

            <Link href="/register">Register</Link>
          </>
        )}

        {(user || session) && (
          <>
            <span className="font-medium">
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
    </nav>
  );
}