"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub } from "react-icons/fi";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.data);
    };

    fetchProjects();
  }, []);

  const highlightProjectText = (text) => {
    if (!text) return "";

    const keywords = [
      "React JS",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "CRUD",
      "Axios",
      "authentication",
      "SharePoint",
      "SPFx",
      "full-stack",
      "responsive",
      "UI",
      "dashboard",
      "API",
    ];

    let result = text;

    keywords.forEach((word) => {
      result = result.replaceAll(
        word,
        `<span class="font-semibold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">${word}</span>`
      );
    });

    return result;
  };

  return (
    <section
      id="projects"
      className="relative py-24 px-5 md:px-20 text-black dark:text-white transition-colors duration-300"
    >
      {/* Section Title with Gradient */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Projects
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Some of my best work — blending creativity with functionality
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -8 }}
            className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 
                       bg-gray-50/80 dark:bg-white/5 
                       backdrop-blur-sm
                       shadow-lg dark:shadow-xl
                       transition-all duration-300
                       hover:shadow-2xl dark:hover:shadow-purple-500/10
                       overflow-hidden"
          >
            {/* Hover Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-blue-500/0 
                           group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-blue-500/20 
                           transition-all duration-700 rounded-2xl" />

            <div className="relative p-6 md:p-8">
              {/* Project Icon/Number */}
              <div className="text-4xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity">

              </div>

              {/* Project Title */}
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 
                             dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                {project.title}
              </h3>

              {/* Description */}
              <div
                className="mt-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: highlightProjectText(project.description),
                }}
              />

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-full font-medium
                              bg-gradient-to-r from-purple-500/10 to-blue-500/10
                              dark:from-purple-500/20 dark:to-blue-500/20
                              text-purple-700 dark:text-purple-300
                              border border-purple-200 dark:border-purple-800/50
                              hover:scale-105 transition-transform duration-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links - Only GitHub Button */}
              <div className="flex gap-3 mt-8">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                             bg-gradient-to-r from-purple-600 to-blue-600 
                             hover:from-purple-700 hover:to-blue-700
                             text-white shadow-lg shadow-purple-500/25
                             hover:shadow-xl hover:shadow-purple-500/40
                             hover:scale-105 transition-all duration-300"
                >
                  <FiGithub className="w-4 h-4" />
                  View Code
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}