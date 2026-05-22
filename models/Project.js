import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    tech: [String],
    github: String,
    live: String,
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);