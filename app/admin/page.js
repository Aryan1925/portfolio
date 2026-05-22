"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderKanban,
  Code2,
  Briefcase,
  Mail,
  FileText,
  ArrowUpRight,
  Sparkles,
  BadgeInfo
} from "lucide-react";

export default function AdminHome() {
  const [userName, setUserName] = useState("Admin");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.name || "Admin");
    }
    // Simulate loading for animation
    setTimeout(() => setIsLoading(false), 100);
  }, []);

  const cards = [
    {
      title: "About",
      href: "/admin/about",
      icon: BadgeInfo,
      desc: "Update your personal information, bio & interests.",
      gradient: "from-cyan-500/20 to-blue-500/10",
      border: "border-cyan-500/20",
      iconColor: "text-cyan-400",
    },
    {
      title: "Skills",
      href: "/admin/skills",
      icon: Code2,
      desc: "Update technical skills, categories & experience levels.",
      gradient: "from-purple-500/20 to-pink-500/10",
      border: "border-purple-500/20",
      iconColor: "text-purple-400",
    },
    {
      title: "Projects",
      href: "/admin/projects",
      icon: FolderKanban,
      desc: "Manage portfolio projects, GitHub links & live demos.",
      gradient: "from-blue-500/20 to-cyan-500/10",
      border: "border-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      title: "Experience",
      href: "/admin/experience",
      icon: Briefcase,
      desc: "Manage internship & work experience details.",
      gradient: "from-orange-500/20 to-yellow-500/10",
      border: "border-orange-500/20",
      iconColor: "text-orange-400",
    },
    {
      title: "Contacts",
      href: "/admin/contact",
      icon: Mail,
      desc: "View contact form messages from visitors.",
      gradient: "from-green-500/20 to-emerald-500/10",
      border: "border-green-500/20",
      iconColor: "text-green-400",
    },
    {
      title: "Resume",
      href: "/admin/resume",
      icon: FileText,
      desc: "Upload and manage your latest resume PDF.",
      gradient: "from-red-500/20 to-pink-500/10",
      border: "border-red-500/20",
      iconColor: "text-red-400",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const heroVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 12 },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: custom * 0.1, duration: 0.4, type: "spring" },
    }),
  };

  const bottomPanelVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.6, duration: 0.5 },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-3 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="admin-home"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        className="space-y-10"
      >
        {/* HERO SECTION */}
        <motion.div
          variants={heroVariants}
          className="relative overflow-hidden rounded-3xl border border-white/10 
          bg-gradient-to-br from-white/10 via-white/5 to-transparent
          p-8 md:p-10 shadow-2xl backdrop-blur-xl"
        >
          {/* GLOW EFFECTS */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-0 right-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full"
          />

          <div className="relative z-10">
            {/* TOP */}
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-r 
                from-blue-500 to-purple-500 flex items-center justify-center shadow-xl"
              >
                <Sparkles className="text-white" size={24} />
              </motion.div>

              <div>
                <motion.h1
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl font-bold"
                >
                  Welcome Back, {userName || "Admin"} 👋
                </motion.h1>
                <motion.p
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-400 mt-1"
                >
                  Manage your portfolio with a modern dashboard experience.
                </motion.p>
              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {[
                { label: "Total Sections", value: cards.length, color: "text-white" },
                { label: "Portfolio", value: "Active", color: "text-green-400" },
                { label: "Theme", value: "Modern", color: "text-white" },
                { label: "Status", value: "Online", color: "text-blue-400" },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  custom={idx}
                  variants={statsVariants}
                  initial="hidden"
                  animate="visible"
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg
                           hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <h2 className={`text-3xl font-bold mt-1 ${stat.color}`}>
                    {stat.value}
                  </h2>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CARDS GRID */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={cardVariants}
                custom={index}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={card.href}
                  className={`group relative overflow-hidden rounded-3xl 
                  border ${card.border}
                  bg-gradient-to-br ${card.gradient}
                  backdrop-blur-xl p-6 shadow-xl
                  hover:shadow-2xl hover:shadow-blue-500/10
                  transition-all duration-500 block cursor-pointer`}
                >
                  {/* HOVER GLOW */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-white/[0.04]"
                  />

                  {/* TOP RIGHT ORB */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full 
                    bg-white/10 blur-3xl"
                  />

                  {/* ICON */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`relative z-10 w-14 h-14 rounded-2xl 
                    bg-black/30 border border-white/10 
                    flex items-center justify-center mb-5 
                    ${card.iconColor}`}
                  >
                    <Icon size={26} />
                  </motion.div>

                  {/* TITLE */}
                  <h2 className="relative z-10 text-xl font-semibold group-hover:text-white transition">
                    {card.title}
                  </h2>

                  {/* DESCRIPTION */}
                  <p className="relative z-10 text-sm text-gray-400 mt-2 
                  leading-relaxed group-hover:text-gray-300 transition">
                    {card.desc}
                  </p>

                  {/* FOOTER */}
                  <div className="relative z-10 flex items-center gap-2 mt-6 text-sm font-medium text-white">
                    Open Section
                    <motion.div
                      animate={{ x: 0, y: 0 }}
                      whileHover={{ x: 4, y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight size={16} />
                    </motion.div>
                  </div>

                  {/* BOTTOM LINE */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.5 }}
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* BOTTOM PANEL */}
        <motion.div
          variants={bottomPanelVariants}
          className="rounded-3xl border border-white/10 bg-white/5 
          backdrop-blur-xl p-8 shadow-xl
          hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-2xl font-bold">Portfolio Control Center</h2>
              <p className="text-gray-400 mt-2 max-w-2xl leading-relaxed">
                Update your projects, manage technical skills, upload resumes,
                track experience, and handle contact messages — all from one
                modern admin dashboard.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r 
              from-blue-500 to-purple-500 font-medium shadow-lg text-center
              hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300"
            >
              Admin Mode Active
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}