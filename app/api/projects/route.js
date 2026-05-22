import { connectDB } from "../../../lib/mongodb";
import Project from "../../../models/Project";

// 📥 GET
export async function GET() {
  await connectDB();
  const projects = await Project.find().sort({ createdAt: -1 });
  return Response.json({ success: true, data: projects });
}

// ➕ POST
export async function POST(req) {
  await connectDB();

  const body = await req.json();

  if (
    !body.title ||
    !body.description ||
    !body.tech ||
    !body.github ||
    !body.live
  ) {
    return Response.json({
      success: false,
      message: "All fields required",
    });
  }

  const project = await Project.create({
    ...body,
    tech: body.tech.split(",").map((t) => t.trim()),
  });

  return Response.json({ success: true, data: project });
}