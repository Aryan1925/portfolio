import { connectDB } from "../../../../lib/mongodb";
import Project from "../../../../models/Project";

// ❌ DELETE
export async function DELETE(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    await Project.findByIdAndDelete(id);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}

// ✏️ UPDATE
export async function PUT(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;
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

    const updated = await Project.findByIdAndUpdate(
      id,
      {
        ...body,
        tech: body.tech.split(",").map((t) => t.trim()),
      },
      { new: true }
    );

    return Response.json({ success: true, data: updated });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}

 