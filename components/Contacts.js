"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaComment,
  FaPaperPlane,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhone,
  FaRegClock
} from "react-icons/fa";

export default function Contacts() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [popupType, setPopupType] = useState("success"); // success | warning

  const handleSubmit = async (e) => {
    e.preventDefault();

    // NAME VALIDATION
    if (!form.name.trim()) {
      toast.error("Name is required!");
      return;
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(form.name.trim())) {
      toast.error("Name should only contain letters!");
      return;
    }

    // EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      toast.error("Email is required!");
      return;
    }
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address!");
      return;
    }
    // MESSAGE VALIDATION
    if (!form.message.trim()) {
      toast.error("Message is required!");
      return;
    }

    // MAX 500 CHAR LIMIT
    if (form.message.length > 500) {
      setPopupType("warning");
      setPopupText(
        "You have exceeded the max limit of 500 characters so further we Comunicate in Email."
      );
      setShowPopup(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        toast.error("Failed to send message!");
        setIsSubmitting(false);
        return;
      }

      await res.json();
      setPopupType("success");
      setPopupText("Message Sent! Further We Comunicate in Email.");
      setShowPopup(true);


      setTimeout(() => {
        setShowPopup(false);
      }, 2000);

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact information
  const contactInfo = [
    { icon: <FaEnvelope className="w-5 h-5" />, label: "Email", value: "aryprj2004@gmail.com", link: "mailto:aryan@example.com" },
    { icon: <FaPhone className="w-5 h-5" />, label: "Phone", value: "+91 12345 67890", link: "tel:+911234567890" },
    { icon: <FaMapMarkerAlt className="w-5 h-5" />, label: "Location", value: "India", link: null },
    { icon: <FaRegClock className="w-5 h-5" />, label: "Response Time", value: "Within 24 hours", link: null },
  ];

  const socialLinks = [
    { icon: <FaGithub className="w-6 h-6" />, name: "GitHub", url: "https://github.com/Aryan1925", color: "hover:text-gray-900 dark:hover:text-white" },
    { icon: <FaLinkedin className="w-6 h-6" />, name: "LinkedIn", url: "https://www.linkedin.com/in/aryan-prajapati-369143357", color: "hover:text-blue-600" },
    { icon: <FaTwitter className="w-6 h-6" />, name: "Twitter", url: "https://twitter.com/aryan", color: "hover:text-sky-500" },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 px-5 md:px-20 text-black dark:text-white transition-colors duration-300 overflow-hidden"
    >
      {/* POPUP */}
{showPopup && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative border shadow-2xl rounded-2xl px-8 py-6 text-center
        ${popupType === "success"
          ? "bg-white dark:bg-black/80 border-green-400/30"
          : "bg-white dark:bg-black/80 border-red-400/40"
        }`}
    >
      {/* ICON */}
      <div
        className={`text-4xl mb-2 ${
          popupType === "success" ? "text-green-500" : "text-red-500"
        }`}
      >
        {popupType === "success" ? "✔" : "⚠"}
      </div>

      {/* TEXT */}
      <h2 className="text-base font-semibold text-gray-800 dark:text-white max-w-sm">
        {popupText}
      </h2>

      {/* CLOSE BUTTON ONLY FOR WARNING */}
      {popupType === "warning" && (
        <button
          onClick={() => setShowPopup(false)}
          className="mt-4 px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          Close
        </button>
      )}
    </motion.div>
  </div>
)}

      {/* ✅ MODERN CONFIRMATION POPUP (ONLY ADDITION) */}
      {/* {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white dark:bg-black/80 border border-green-400/30 
                       shadow-2xl rounded-2xl px-8 py-6 text-center"
          >
            <div className="text-green-500 text-4xl mb-2">✔</div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Message Sent!
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
              I’ll get back to you soon 🚀
            </p>
          </motion.div>
        </div>
      )} */}

      {/* Section Title */}
      <div className="text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Let’s Connect
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
          Have a project in mind? Let’s work together!
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 
                           bg-gray-50/80 dark:bg-white/5 
                           backdrop-blur-sm
                           shadow-lg dark:shadow-xl
                           p-6 md:p-8
                           transition-all duration-300
                           hover:shadow-2xl dark:hover:shadow-purple-500/10
                           h-full flex flex-col">

              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 
                             dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                Get in Touch
              </h3>

              <div className="space-y-4 flex-1">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-3 rounded-xl
                               hover:bg-white/50 dark:hover:bg-white/5
                               transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 
                                    text-purple-600 dark:text-purple-400
                                    group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 dark:text-gray-500">{info.label}</p>
                      {info.link ? (
                        <a href={info.link}
                          className="text-gray-700 dark:text-gray-300 font-medium 
                                     hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-700 dark:text-gray-300 font-medium">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links (UNCHANGED) */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Connect with me:</p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5 }}
                      className={`p-3 rounded-xl bg-white dark:bg-white/10
                                 border border-gray-200 dark:border-gray-700
                                 text-gray-600 dark:text-gray-400
                                 ${social.color} transition-all duration-300`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE (UNCHANGED) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 
                           bg-gray-50/80 dark:bg-white/5 
                           backdrop-blur-sm
                           shadow-lg dark:shadow-xl
                           p-6 md:p-8
                           h-full flex flex-col">

              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 
                             dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
                <div className="space-y-5 flex-1">

                  {/* NAME */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <FaUser className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={form.name || ""}
                      className="w-full p-3 pl-10 rounded-xl 
                                bg-white dark:bg-black/40 
                                border border-gray-300 dark:border-gray-700 
                                text-black dark:text-white"
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <FaEnvelope className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={form.email || ""}
                      className="w-full p-3 pl-10 rounded-xl 
                                bg-white dark:bg-black/40 
                                border border-gray-300 dark:border-gray-700 
                                text-black dark:text-white"
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>

                  {/* MESSAGE */}
                  <div className="relative">
                    <div className="absolute left-3 top-4 text-gray-400">
                      <FaComment className="w-4 h-4" />
                    </div>
                    <textarea
                      rows="5"
                      placeholder="Your Message"
                      value={form.message || ""}
                      className="w-full p-3 pl-10 rounded-xl 
                                bg-white dark:bg-black/40 
                                border border-gray-300 dark:border-gray-700 
                                text-black dark:text-white"
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                </div>

                {/* BUTTON */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl font-medium 
                             bg-gradient-to-r from-purple-600 to-blue-600 
                             hover:from-purple-700 hover:to-blue-700
                             text-white shadow-lg shadow-purple-500/25
                             hover:shadow-xl hover:shadow-purple-500/40
                             transition-all duration-300
                             disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center justify-center gap-2
                             relative overflow-hidden group/btn
                             mt-auto"
                >
                  <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-center text-gray-500 dark:text-gray-600 mt-4">
                  I’ll get back to you within 24 hours
                </p>

              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}