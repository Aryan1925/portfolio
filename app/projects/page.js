import Link from "next/link";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import { siteConfig } from "@/lib/site";
import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projects",
  description: `Explore the projects built by ${siteConfig.name}, a ${siteConfig.role} working with React.js, Next.js, Node.js, Express.js, and MongoDB.`,
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Projects
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Some of my best work — blending creativity with functionality
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project._id.toString()}
              className="group relative rounded-2xl border border-gray-200 dark:border-gray-800
                         bg-gray-50/80 dark:bg-white/5
                         backdrop-blur-sm
                         shadow-lg dark:shadow-xl
                         transition-all duration-300
                         hover:shadow-2xl dark:hover:shadow-purple-500/10
                         hover:-translate-y-2
                         overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-blue-500/0
                              group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-blue-500/10
                              transition-all duration-700 rounded-2xl" />

              <div className="relative p-6 md:p-8">
                <Link
                  href={`/projects/${project._id}`}
                  className="flex items-center justify-between gap-4 group/title"
                >
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600
                                dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                    {project.title}
                  </h2>
                  <FiArrowUpRight className="w-6 h-6 opacity-30 group-hover:opacity-100 text-purple-500 transition-opacity" />
                </Link>

                <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {(project.tech || []).map((t, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1.5 rounded-full font-medium
                                bg-gradient-to-r from-purple-500/10 to-blue-500/10
                                dark:from-purple-500/20 dark:to-blue-500/20
                                text-purple-700 dark:text-purple-300
                                border border-purple-200 dark:border-purple-800/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {project.github && (
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
                                 transition-all duration-300"
                    >
                      <FiGithub className="w-4 h-4" />
                      View Code
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium
                       bg-gradient-to-r from-purple-500 to-blue-500 text-white
                       hover:scale-105 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}