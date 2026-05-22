import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    company: String,
    role: String,
    duration: String,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.models.Experience ||
  mongoose.model("Experience", ExperienceSchema);