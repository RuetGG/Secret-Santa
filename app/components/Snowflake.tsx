"use client";
import { useEffect, useState } from "react";

type Flake = {
  left: number;
  delay: number;
  size: number;
};

export default function Snowflake() {
  const [snowflakes, setSnowflakes] = useState<Flake[]>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 30 }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: 12 + Math.random() * 12,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-64 overflow-hidden pointer-events-none select-none z-0">
      {/* Gradient background for icy effect */}
      <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-white via-blue-100 to-blue-200"></div>

      {/* Snowflakes */}
      {snowflakes.map((flake, i) => (
        <div
          key={i}
          className="absolute text-white opacity-80 animate-fall"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.size}px`,
            animationDelay: `${flake.delay}s`,
          }}
        >
          ❄️
        </div>
      ))}
    </div>
  );
}
