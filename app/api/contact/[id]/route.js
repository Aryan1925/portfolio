import { connectDB } from "../../../../lib/mongodb";
import Contact from "../../../../models/Contact";
import { NextResponse } from "next/server";


// GET single contact
export async function GET(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    
    const contact = await Contact.findById(id);
    
    if (!contact) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: contact });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PATCH - Update read status
export async function PATCH(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await req.json();
    
    const updated = await Contact.findByIdAndUpdate(
      id,
      { read: body.read },
      { new: true }
    );
    
    if (!updated) {
      return NextResponse.json({ success: false, error: "Contact not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req, context) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ IMPORTANT

    await Contact.findByIdAndDelete(id);

    return Response.json({ success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false });
  }
}