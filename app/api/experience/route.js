import { connectDB } from "../../../lib/mongodb";
import Experience from "../../../models/Experience";

export async function GET() {
  await connectDB();
  const data = await Experience.find().sort({ createdAt: -1 });
  return Response.json({ success: true, data });
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  if (!body.company || !body.role || !body.duration) {
    return Response.json({ success: false, message: "Required fields missing" });
  }

  const exp = await Experience.create(body);

  return Response.json({ success: true, data: exp });
}