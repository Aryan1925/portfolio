import { connectDB } from "../../../../lib/mongodb";
import Skill from "../../../../models/Skill";

// DELETE
export async function DELETE(req, context) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ FIX

    await Skill.findByIdAndDelete(id);

    return Response.json({ success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false });
  }
}

// UPDATE
export async function PUT(req, context) {
  await connectDB();

  const { id } = await context.params; // ✅ FIX
  const body = await req.json();

  const updated = await Skill.findByIdAndUpdate(id, body, {
    new: true,
  });

  return Response.json({ success: true, data: updated });
}