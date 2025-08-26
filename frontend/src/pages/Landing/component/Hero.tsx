import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Turn Any Video into Multi-Channel Content
      </h1>
      <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-300 mb-8">
        Upload a YouTube link and get blogs, LinkedIn posts, tweet threads, and
        thumbnails — powered by Whisper + Gemini.
      </p>
      <Link to="/repurposer">
        <button className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md">
          🚀 Get Started
        </button>
      </Link>
    </section>
  );
};

export default Hero;
