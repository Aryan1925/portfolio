import { cache } from "react";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import "@/models/Project";

export const getProjects = cache(async () => {
  await connectDB();
  return mongoose.models.Project.find().sort({ createdAt: -1 }).lean();
});

export const getProjectById = cache(async (id) => {
  if (!mongoose.isValidObjectId(id)) {
    return null;
  }
  await connectDB();
  return mongoose.models.Project.findById(id).lean();
});