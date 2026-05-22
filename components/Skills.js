"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [grouped, setGrouped] = useState({});

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const res = await fetch("/api/skills", {
          cache: "no-store",
        });

        const data = await res.json();
        const rawSkills = data.data || [];
        
        // 🔥 FIX: Split technologies that are combined with commas
        const splitSkills = [];
        
        rawSkills.forEach(skill => {
          // Check if the name contains commas (multiple technologies)
          if (skill.name.includes(', ')) {
            // Split by comma and create separate entries
            const techNames = skill.name.split(', ');
            techNames.forEach(techName => {
              splitSkills.push({
                ...skill,
                _id: `${skill._id}-${techName}`,
                name: techName.trim()
              });
            });
          } else {
            splitSkills.push(skill);
          }
        });
        
        setSkills(splitSkills);
        
        // Group by category
        const groupedData = splitSkills.reduce((acc, skill) => {
          const category = skill.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(skill);
          return acc;
        }, {});
        
        setGrouped(groupedData);
        
      } catch (err) {
        console.log(err);
      }
    };

    loadSkills();
  }, []);

  return (
    <section
      id="skills"
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
          Technical Skills
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
          Technologies and tools I work with
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.keys(grouped).map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-blue-500/0 
                             group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-blue-500/20 
                             transition-all duration-700 rounded-2xl" />
              
              <div className="relative p-6 md:p-8">
                {/* Category Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 
                                 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                    {category}
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mt-2 rounded-full" />
                  
                  {/* NOW SHOWS CORRECT COUNT */}
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400 font-medium">
                      {grouped[category].length} {grouped[category].length === 1 ? 'Technology' : 'Technologies'}
                    </span>
                  </div>
                </div>

                {/* Skills List - Shows ALL split technologies */}
                <div className="flex flex-wrap gap-3">
                  {grouped[category].map((skill) => (
                    <motion.span
                      key={skill._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      viewport={{ once: true }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                                 bg-white dark:bg-white/10
                                 border border-gray-200 dark:border-gray-700
                                 text-gray-700 dark:text-gray-200
                                 font-medium text-sm
                                 hover:scale-105 hover:shadow-md
                                 transition-all duration-200
                                 cursor-default"
                    >
                      <span>{skill.name}</span>
                      {skill.level && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                          ${skill.level === "Advanced" ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" :
                            skill.level === "Intermediate" ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400" :
                            "bg-blue-500/20 text-blue-600 dark:text-blue-400"}`}
                        >
                          {skill.level === "Advanced" ? "🚀" : skill.level === "Intermediate" ? "📘" : "📗"}
                        </span>
                      )}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {Object.keys(grouped).length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading skills...</p>
        </div>
      )}
    </section>
  );
}