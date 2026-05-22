import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="mt-24 border-t border-gray-200 dark:border-gray-800 
      bg-white dark:bg-black text-black dark:text-white 
      transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-6 py-10 text-center">

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-6 text-xl">

          <a
            href="https://github.com/Aryan1925"
            target="_blank"
            className="hover:text-blue-500 transition"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/aryan-prajapati-369143357"
            target="_blank"
            className="hover:text-blue-500 transition"
          >
            <FaLinkedin />
          </a>

          <a
            href="mailto:yourmail@gmail.com"
            className="hover:text-blue-500 transition"
          >
            <FaEnvelope />
          </a>

        </div>

        {/* Text */}
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          © 2026 Aryan • Built with Next.js
        </p>

        {/* Sub text */}
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          Designed and Developed with attention to detail, creativity, and passion for building impactful digital experiences 🚀
        </p>

      </div>
    </footer>
  );
}