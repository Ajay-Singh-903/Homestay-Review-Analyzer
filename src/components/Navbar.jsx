"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="bg-green-700 dark:bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold">
        Homestay Review Analyzer
      </h1>

      <div className="flex flex-wrap items-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/login">Login</Link>

        <ThemeToggle />
      </div>
    </nav>
  );
}