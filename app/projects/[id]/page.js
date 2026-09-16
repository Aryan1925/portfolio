import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FiGithub,
  FiArrowUpRight,
  FiExternalLink,
  FiArrowLeft,
} from "react-icons/fi";
import { siteConfig, buildProjectJsonLd } from "@/lib/site";
import { getProjectById } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The project you are looking for could not be found.",
    };
  }

  const description =
    project.description?.slice(0, 155) ||
    `${project.title} — a project by ${siteConfig.name}.`;

  return {
    title: project.title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/projects/${id}`,
    },
    openGraph: {
      title: `${project.title} — ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/projects/${id}`,
      type: "article",
      images: [{ url: siteConfig.image }],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const jsonLd = buildProjectJsonLd(project);

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400
                     hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          All Projects
        </Link>

        <h1 className="mt-6 text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          {project.title}
        </h1>

        <div className="mt-6 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-line">
          {project.description}
        </div>

        <div className="flex flex-wrap gap-2 mt-8">
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

        <div className="flex flex-wrap gap-3 mt-10">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium
                         bg-gradient-to-r from-purple-600 to-blue-600
                         hover:from-purple-700 hover:to-blue-700
                         text-white shadow-lg shadow-purple-500/25
                         hover:shadow-xl hover:shadow-purple-500/40
                         transition-all duration-300"
            >
              <FiGithub className="w-4 h-4" />
              View Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium
                         border border-gray-200 dark:border-gray-800
                         bg-gray-50 dark:bg-white/5
                         hover:bg-gray-100 dark:hover:bg-white/10
                         transition-all duration-300"
            >
              <FiExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Built by{" "}
            <Link
              href="/"
              className="font-medium text-purple-500 hover:text-purple-400"
            >
              {siteConfig.name}
            </Link>
          </p>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400
                       hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
          >
            Back to Home
            <FiArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}