import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    name: String,

    category: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Intermediate",
    },

    icon: String, // optional (future UI improvement)
  },
  { timestamps: true }
);

export default mongoose.models.Skill ||
  mongoose.model("Skill", SkillSchema);