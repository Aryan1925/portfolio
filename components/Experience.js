"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const loadExperience = async () => {
      try {
        const res = await fetch("/api/experience", {
          cache: "no-store",
        });
        const data = await res.json();
        setExperiences(data.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    loadExperience();
  }, []);

  const highlightText = (text) => {
    if (!text) return "";

    const keywords = [
      "React JS",
      "SPFx",
      "SharePoint Framework",
      "Node.js",
      "Axios",
      "CRUD",
      "REST APIs",
      "MERN",
      "4-month internship",
      "GST filing",
      "TDS calculations",
      "accounting",
      "financial record management",
      "Hospital Management",
      "authentication APIs",
      "full-stack development",
      "taxation rules",
      "Tally",
      "journal entries",
      "bank reconciliations",
      "vendor payments",
      "financial records",
      "ledgers",
      "GST/TDS returns",
      "audits",
      "bookkeeping",
      "record-keeping",
    ];

    let highlightedText = text;

    keywords.forEach((word) => {
      highlightedText = highlightedText.replaceAll(
        word,
        `<span class="font-semibold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">${word}</span>`
      );
    });

    return highlightedText;
  };

  return (
    <section
      id="experience"
      className="relative py-24 px-5 md:px-20 text-black dark:text-white transition-colors duration-300 overflow-hidden"
    >
      {/* Section Title */}
      <div className="text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Work Experience
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
          My professional journey and work experience
        </motion.p>
      </div>

      {/* Timeline Container */}
      <div className="max-w-4xl mx-auto relative">
        {/* Timeline Line */}
        <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-px 
                        bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500 
                        hidden md:block" />

        {experiences.map((exp, index) => (
          <motion.div
            key={exp._id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className={`relative mb-12 md:flex md:items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 
                           w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500
                           shadow-lg shadow-purple-500/50 z-10 hidden md:block" />

            {/* Content Card */}
            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 
                           bg-gray-50/80 dark:bg-white/5 
                           backdrop-blur-sm
                           shadow-lg dark:shadow-xl
                           transition-all duration-300
                           hover:shadow-2xl dark:hover:shadow-purple-500/10
                           overflow-hidden"
              >
                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-blue-500/0 
                               group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-blue-500/20 
                               transition-all duration-700 rounded-2xl" />

                <div className="relative p-6 md:p-8">
                  {/* Company Logo/Icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 
                                    text-purple-600 dark:text-purple-400">
                      <FaBuilding className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 
                                   dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                      {exp.company}
                    </h3>
                  </div>

                  {/* Role */}
                  <div className="flex items-center gap-2 mb-3">
                    <FaBriefcase className="w-4 h-4 text-purple-500" />
                    <p className="text-md font-semibold text-gray-700 dark:text-gray-300">
                      {exp.role}
                    </p>
                  </div>

                  {/* Duration & Location */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {exp.duration}
                      </span>
                    </div>
                    {exp.location && (
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="w-3 h-3 text-pink-500" />
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {exp.location}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="w-16 h-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mb-4" />

                  {/* Description */}
                  <div
                    className="text-sm leading-relaxed text-gray-600 dark:text-gray-300"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(exp.description),
                    }}
                  />

                  {/* Tech Stack (if you have it in your data) */}
                  {exp.tech && exp.tech.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-800">
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-full
                                       bg-white dark:bg-white/10
                                       border border-gray-200 dark:border-gray-700
                                       text-gray-600 dark:text-gray-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Experience Message */}
      {experiences.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full 
                          bg-gray-100 dark:bg-white/10 mb-4">
            <FaBriefcase className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            No work experience added yet
          </p>
        </motion.div>
      )}
    </section>
  );
}