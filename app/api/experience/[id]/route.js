import { connectDB } from "../../../../lib/mongodb";
import Experience from "../../../../models/Experience";

export async function DELETE(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    await Experience.findByIdAndDelete(id);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  const body = await req.json();

  const updated = await Experience.findByIdAndUpdate(params.id, body, {
    new: true,
  });

  return Response.json({ success: true, data: updated });
}