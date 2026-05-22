import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    fileName: String,
    fileUrl: String,
    publicId: String,

title: {
  type: String,
  default: "",
},

projects: {
  type: String,
  default: "",
},

experience: {
  type: String,
  default: "",
},

technologies: {
  type: String,
  default: "",
},

highlights: {
  type: String,
  default: "",
},

description1: {
  type: String,
  default: "",
},

description2: {
  type: String,
  default: "",
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Resume ||
  mongoose.model("Resume", ResumeSchema);