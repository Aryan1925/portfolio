import { siteConfig } from "@/lib/site";
import { connectDB } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const staticUrls = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  let projectUrls = [];
  try {
    const mongoose = await connectDB();
    const projects = await mongoose.connection.db
      .collection("projects")
      .find({}, { projection: { _id: 1, updatedAt: 1 } })
      .toArray();
    projectUrls = projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project._id}`,
      lastModified: project.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (error) {
    console.log("Sitemap failed to load projects:", error.message);
  }

  return [...staticUrls, ...projectUrls];
}