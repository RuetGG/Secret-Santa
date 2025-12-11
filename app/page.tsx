"use client";
import { useState } from "react";
import Snowflake from "./components/Snowflake";

export default function Home() {
  const [name, setName] = useState("");
  const [target, setTarget] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setTarget(null);

    try {
      const res = await fetch(`/api/result?name=${encodeURIComponent(name)}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setTarget(data.target);
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <main className="min-h-screen relative bg-white overflow-hidden flex flex-col items-center justify-center p-4 font-christmas">
      {/* Snowflakes */}
      <Snowflake />

      {/* Page title */}
      <h1 className="text-6xl font-bold text-red-600 mb-8 drop-shadow-lg relative z-10 mt-20">
        🎄 Secret Santa 🎁
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-72 relative z-10"
      >
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-6 py-4 rounded-lg border-2 border-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 text-center text-red-700 text-2xl shadow-md"
        />
        <button className="bg-red-600 text-white py-3 rounded-lg font-bold hover:scale-105 transform transition-all duration-200 shadow-md text-2xl">
          Reveal My Person
        </button>
      </form>

      {/* Error message */}
      {error && <p className="text-red-700 mt-4 z-10 relative">{error}</p>}

      {/* Result box */}
      {target && (
        <div className="mt-6 p-6 bg-green-100 rounded-2xl shadow-xl text-center text-green-800 font-bold text-lg relative z-10">
          🎁 Your Secret Santa target is: {target} 🎁
          <span className="absolute top-0 right-0 text-yellow-400 text-2xl animate-pulse">
            ✨
          </span>
        </div>
      )}


      {/* Icy snow at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-blue-100 via-white to-white rounded-t-full"></div>
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-blue-200 text-xl animate-fall pointer-events-none select-none"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${12 + Math.random() * 12}px`,
            }}
          >
            ❄️
          </div>
        ))}
      </div>
    </main>
  );
}
