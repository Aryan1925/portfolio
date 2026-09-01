"use client";

import { motion } from "framer-motion";
import useTypewriter from "@/hooks/useTypewriter";

const phrases = [
  "With Modern Technologies",
  "With React & Next.js",
  "With Clean Code",
  "With Scalable Solutions",
];

export default function Hero() {
  const typed = useTypewriter(phrases, {
    typingSpeed: 80,
    deletingSpeed: 40,
    pauseAfterType: 1500,
    pauseAfterDelete: 300,
  });

  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen overflow-hidden
      text-black dark:text-white transition-colors duration-300"
    >
      {/* Content Card */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        {/* Small Intro */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm tracking-widest uppercase text-gray-600 dark:text-gray-400"
        >
          Full-Stack Developer • React • Next.js • MongoDB
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mt-4 leading-tight"
        >
          Creating Elegant Interfaces
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
            {" "}
            {typed}
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse">
            |
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-6 text-lg text-gray-600 dark:text-gray-300"
        >
          I’m Aryan, a developer who loves crafting clean UI, smooth animations,
          and scalable web applications.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="flex gap-4 justify-center mt-8"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-full font-medium
            bg-gradient-to-r from-purple-500 to-blue-500 text-white
            hover:scale-105 transition"
          >
            View Projects
          </a>

          <a
            href="#contact"
            className="px-6 py-3 rounded-full font-medium
             border border-gray-200 dark:border-gray-800
             bg-gray-50 dark:bg-white/5
             hover:bg-black hover:text-white
             dark:hover:bg-white dark:hover:text-black
             transition duration-300"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
}
