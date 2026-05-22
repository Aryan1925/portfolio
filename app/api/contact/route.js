import { connectDB } from "@/lib/mongodb";  // If lib is at root
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    const contact = await Contact.create({
      name: body.name,
      email: body.email,
      message: body.message,
      read: false,
    });
    
    return NextResponse.json({ 
      success: true, 
      data: contact 
    });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ 
      success: true, 
      data: contacts 
    });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}