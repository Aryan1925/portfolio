"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  FaUserGraduate,
  FaCode,
  FaRocket,
  FaHeart,
} from "react-icons/fa";

export default function About() {

  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {

      const res = await fetch("/api/about");

      const data = await res.json();    

      setAbout(data);

    } catch (error) {
      console.log(error);
    }
  };

  if (!about) {
    return (
      <section
        id="about"
        className="py-24 flex items-center justify-center"
      >
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  const interestsArray = about?.interests
    ? about.interests.split(",")
    : [];

  return (
    <section
      id="about"
      className="relative py-24 px-5 md:px-20 text-black dark:text-white transition-colors duration-300 overflow-hidden"
    >

      {/* SECTION TITLE */}
      <div className="text-center mb-14">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          About Me
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "5rem" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4 rounded-full"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Get to know me better
        </motion.p>

      </div>

      <div className="max-w-4xl mx-auto px-6">

        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ y: -8 }}
          className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 
                     bg-gray-50/80 dark:bg-white/5 
                     backdrop-blur-sm
                     shadow-lg dark:shadow-xl
                     transition-all duration-300
                     hover:shadow-2xl dark:hover:shadow-purple-500/10
                     overflow-hidden"
        >

          {/* HOVER EFFECT */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-blue-500/0 
            group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-blue-500/20 
            transition-all duration-700 rounded-2xl"
          />

          <div className="relative p-8 md:p-10">

            {/* PROFILE SECTION */}
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">

              {/* AVATAR */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex-shrink-0"
              >

                <div className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1">

                  <div className="w-full h-full rounded-full bg-gray-900 dark:bg-black flex items-center justify-center">

                    <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                      {about?.name?.charAt(0) || "A"}
                    </span>

                  </div>

                </div>

              </motion.div>

              {/* INTRO */}
              <div className="flex-1 text-center md:text-left">

                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 
                  dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent"
                >
                  {about?.name}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-gray-600 dark:text-gray-400 mt-1"
                >
                  {about?.role}
                </motion.p>

                {/* QUICK STATS */}
                <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">

                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FaUserGraduate className="text-purple-500" />
                    <span>{about?.education}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FaCode className="text-blue-500" />
                    <span>{about?.experience}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FaRocket className="text-pink-500" />
                    <span>{about?.projects}</span>
                  </div>

                </div>

              </div>

            </div>

            {/* DIVIDER */}
            <div className="my-8 border-t border-gray-200 dark:border-gray-800" />

            {/* DESCRIPTION */}
            <motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.5 }}
  viewport={{ once: true }}
  className="space-y-5"
>

  {/* DESCRIPTION 1 */}
  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px] md:text-base">

    {about?.description1
      ?.split(" ")
      .map((word, index) => {

        const cleanWord = word.replace(/[.,]/g, "");

        const purpleWords = [
          "Full-Stack",
          "Developer",
          "SPConsol",
          "modern",
          "responsive",
          "user-friendly",
        ];

        const blueWords = [
          "web",
          "applications",
          "real-world",
          "problems",
        ];

        return (
          <span
            key={index}
            className={
              purpleWords.includes(cleanWord)
                ? "text-purple-600 dark:text-purple-400 font-semibold"
                : blueWords.includes(cleanWord)
                ? "text-blue-600 dark:text-blue-400 font-semibold"
                : ""
            }
          >
            {word}{" "}
          </span>
        );
      })}
  </p>

  {/* DESCRIPTION 2 */}
  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px] md:text-base">

    {about?.description2
      ?.split(" ")
      .map((word, index) => {

        const cleanWord = word.replace(/[.,]/g, "");

        const purpleWords = [
          "REST",
          "APIs",
          "CRUD",
          "Axios",
          "React",
          "Node.js",
          "SPFx",
        ];

        const blueWords = [
          "internship",
          "client",
          "projects",
          "SharePoint",
          "Framework",
        ];

        return (
          <span
            key={index}
            className={
              purpleWords.includes(cleanWord)
                ? "text-purple-600 dark:text-purple-400 font-semibold"
                : blueWords.includes(cleanWord)
                ? "text-blue-600 dark:text-blue-400 font-semibold"
                : ""
            }
          >
            {word}{" "}
          </span>
        );
      })}
  </p>

  {/* DESCRIPTION 3 */}
  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px] md:text-base">

    {about?.description3
      ?.split(" ")
      .map((word, index) => {

        const cleanWord = word.replace(/[.,]/g, "");

        const purpleWords = [
          "Master",
          "Computer",
          "Applications",
          "MCA",
          "API",
          "development",
        ];

        const blueWords = [
          "technical",
          "expertise",
          "impactful",
          "solutions",
        ];

        return (
          <span
            key={index}
            className={
              purpleWords.includes(cleanWord)
                ? "text-purple-600 dark:text-purple-400 font-semibold"
                : blueWords.includes(cleanWord)
                ? "text-blue-600 dark:text-blue-400 font-semibold"
                : ""
            }
          >
            {word}{" "}
          </span>
        );
      })}
  </p>

</motion.div>

            {/* INTERESTS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800"
            >

              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <FaHeart className="text-red-500" />
                When I’m not coding
              </h4>

              <div className="flex flex-wrap gap-2">

                {interestsArray.map((interest, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-full
                    bg-white dark:bg-white/10
                    border border-gray-200 dark:border-gray-700
                    text-gray-600 dark:text-gray-400"
                  >
                    {interest.trim()}
                  </span>
                ))}

              </div>

            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium
                bg-gradient-to-r from-purple-600 to-blue-600 
                hover:from-purple-700 hover:to-blue-700
                text-white shadow-lg shadow-purple-500/25
                hover:shadow-xl hover:shadow-purple-500/40
                hover:scale-105 transition-all duration-300"
              >
                Let&apos;s Connect

                <FaRocket className="w-4 h-4" />
              </a>

            </motion.div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}