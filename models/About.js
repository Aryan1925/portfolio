import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    role: {
      type: String,
    },

    experience: {
      type: String,
    },

    projects: {
      type: String,
    },

    company: {
      type: String,
    },

    education: {
      type: String,
    },

    description1: {
      type: String,
    },

    description2: {
      type: String,
    },

    description3: {
      type: String,
    },

    interests: {
      type: String,
    },

    image: {
      type: String,
    },

    imagePublicId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.About ||
  mongoose.model("About", AboutSchema);