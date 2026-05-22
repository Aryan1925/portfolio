import { connectDB } from "../../../lib/mongodb";
import Skill from "../../../models/Skill";

// GET
export async function GET() {
  await connectDB();
  const skills = await Skill.find().sort({ createdAt: -1 });
  return Response.json({ success: true, data: skills });
}

// POST
export async function POST(req) {
  await connectDB();
  const body = await req.json();

  if (!body.name || !body.level) {
    return Response.json({ success: false, message: "All fields required" });
  }

  const skill = await Skill.create(body);

  return Response.json({ success: true, data: skill });
}