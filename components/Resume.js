"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaDownload,
  FaFilePdf,
  FaEye,
  FaStar,
  FaAward,
  FaCode,
  FaRocket,
  FaGraduationCap
} from "react-icons/fa";

export default function Resume() {

  const [resumeUrl, setResumeUrl] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  // NEW STATES
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {

    const loadResume = async () => {

      try {

        const res = await fetch("/api/resume", {
          cache: "no-store",
        });

        const data = await res.json();

        if (data.success && data.data) {

          setResumeUrl(data.data.fileUrl);

          setResumeData(data.data);

        }

      } catch (err) {

        console.log(err);

      }
    };

    loadResume();

  }, []);

  // Custom download function with proper filename
  const downloadResume = async (url, fileName) => {

    if (!url) return;

    try {

      const response = await fetch(url);

      const blob = await response.blob();

      const link = document.createElement("a");

      const blobUrl = URL.createObjectURL(blob);

      link.href = blobUrl;

      link.download = fileName || "Aryan-Resume.pdf";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);

    } catch (error) {

      console.error("Download failed:", error);

    }
  };

  // UPDATED STATS DATA FROM DATABASE
  const stats = [
    {
      icon: <FaCode className="w-5 h-5" />,
      label: "Projects",
      value: resumeData?.projects || "0+",
    },

    {
      icon: <FaGraduationCap className="w-5 h-5" />,
      label: "Experience",
      value: resumeData?.experience || "0",
    },

    {
      icon: <FaAward className="w-5 h-5" />,
      label: "Technologies",
      value: resumeData?.technologies || "0+",
    },
  ];

  return (
    <section
      id="resume"
      className="relative py-24 px-5 md:px-20 text-black dark:text-white transition-colors duration-300 overflow-hidden"
    >

      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

      {/* Section Title */}
      <div className="text-center mb-14">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          My Resume
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
          Your gateway to understanding my professional journey
        </motion.p>

      </div>

      <div className="max-w-4xl mx-auto px-6">

        {/* Main Card */}
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
                     hover:shadow-2xl dark:hover:shadow-purple-500/20
                     overflow-hidden"
        >

          {/* Hover Gradient Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-blue-500/0 
                         group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-blue-500/20 
                         transition-all duration-700 rounded-2xl" />

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 
                          rounded-full blur-3xl -mr-16 -mt-16" />

          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500/10 to-purple-500/10 
                          rounded-full blur-3xl -ml-16 -mb-16" />

          <div className="relative p-8 md:p-10">

            {/* Header with PDF Icon */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex-shrink-0"
              >

                <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 p-1
                                shadow-lg shadow-purple-500/25">

                  <div className="w-full h-full rounded-xl bg-gray-900 dark:bg-black 
                                  flex items-center justify-center">

                    <FaFilePdf className="w-10 h-10 text-red-500" />

                  </div>

                </div>

              </motion.div>

              <div className="flex-1 text-center md:text-left">

                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 
                             dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent"
                >
                  Professional Resume
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-gray-600 dark:text-gray-400 mt-2"
                >
                  {resumeData?.title || "Updated May 2026"}
                </motion.p>

              </div>

            </div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
            >

              {stats.map((stat, index) => (

                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-white/50 dark:bg-white/5
                             border border-gray-200 dark:border-gray-800
                             hover:scale-105 transition-transform duration-300"
                >

                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg 
                                  bg-gradient-to-r from-purple-500/20 to-blue-500/20 
                                  text-purple-600 dark:text-purple-400 mb-2">
                    {stat.icon}
                  </div>

                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>

                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {stat.label}
                  </div>

                </div>
              ))}

            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >

              <div className="flex items-start gap-3">

                <div className="flex-shrink-0 mt-1">

                  <div
                    className="w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"
                    style={{ height: "100%", minHeight: "100px" }}
                  />

                </div>

                <div className="space-y-3">

  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
    {resumeData?.description1
      ?.split(" ")
      .map((word, index) => {

        const cleanWord = word.replace(/[.,]/g, "");

        const highlightedWords = [
          "Full-Stack",
          "Developer",
        ];

        const isHighlighted =
          highlightedWords.includes(cleanWord);

        return (
          <span
            key={index}
            className={
              isHighlighted
                ? "text-purple-600 dark:text-purple-400 font-semibold"
                : ""
            }
          >
            {word}{" "}
          </span>
        );
      })}
  </p>

  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
    {resumeData?.description2
      ?.split(" ")
      .map((word, index) => {

        const cleanWord = word.replace(/[.,]/g, "");

        const highlightedWords = [
          "Full-Stack",
          "Developer",
          "REST",
          "API",
          "React",
          "Node.js",
          "(SPFx)",
          "SPConsol",
          "MongoDB",
          "Next.js",
          "CRUD",
          "Axios",
        ];

        const isHighlighted =
          highlightedWords.includes(cleanWord);

        return (
          <span
            key={index}
            className={
              isHighlighted
                ? "text-blue-600 dark:text-blue-400 font-semibold"
                : ""
            }
          >
            {word}{" "}
          </span>
        );
      })}
  </p>

</div>

              </div>

            </motion.div>

            {/* Key Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
              className="mb-8"
            >

              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">

                <FaStar className="w-4 h-4 text-yellow-500" />

                Key Highlights

              </h4>
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">

  {(
    Array.isArray(resumeData?.highlights)
      ? resumeData.highlights
      : resumeData?.highlights
          ?.split("\n")
          ?.filter((item) => item.trim() !== "")
  )?.map((highlight, i) => (

    <div
      key={i}
      className="flex items-center gap-2"
    >

      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />

      <span className="text-sm text-gray-600 dark:text-gray-400">
        {highlight}
      </span>

    </div>

  ))}

</div>

            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >

              {/* DOWNLOAD BUTTON */}
              <button
                onClick={() =>
                  downloadResume(
                    resumeUrl,
                    "Aryan-Resume.pdf"
                  )
                }
                onMouseEnter={() =>
                  setIsHovered(true)
                }
                onMouseLeave={() =>
                  setIsHovered(false)
                }
                className="group/btn inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-medium
                           bg-gradient-to-r from-purple-600 to-blue-600 
                           hover:from-purple-700 hover:to-blue-700
                           text-white shadow-lg shadow-purple-500/25
                           hover:shadow-xl hover:shadow-purple-500/40
                           hover:scale-105 transition-all duration-300 relative overflow-hidden cursor-pointer"
              >

                <FaDownload
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isHovered
                      ? "animate-bounce"
                      : ""
                  }`}
                />

                Download Resume

                <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />

              </button>

              {/* PREVIEW BUTTON */}
              {resumeUrl && (

                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-medium
                             border border-gray-300 dark:border-gray-700
                             bg-white/50 dark:bg-white/5
                             hover:bg-gray-900 hover:text-white
                             dark:hover:bg-white dark:hover:text-black
                             hover:scale-105 transition-all duration-300 cursor-pointer"
                >

                  <FaEye className="w-4 h-4" />

                  Preview Resume

                </a>
              )}

            </motion.div>

            {/* File Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              viewport={{ once: true }}
              className="mt-6 text-center"
            >

              <p className="text-xs text-gray-500 dark:text-gray-600">
                PDF format • Ready to download • Print friendly
              </p>

            </motion.div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}