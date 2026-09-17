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
            href="mailto:aryprj2004@gmail.com"
            className="hover:text-blue-500 transition"
            aria-label="Email Aryan Prajapati"
          >
            <FaEnvelope />
          </a>

        </div>

        {/* Text */}
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          © 2026 Aryan Prajapati • Full-Stack Developer Portfolio
        </p>

        {/* Sub text */}
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          Aryan Prajapati is a full-stack developer building impactful digital
          experiences with React.js, Next.js, Node.js, and MongoDB.
        </p>

      </div>
    </footer>
  );
}