import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,  // Add this field
    },
  },
  {
    timestamps: true, // This automatically adds createdAt and updatedAt
  }
);

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);