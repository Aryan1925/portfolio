import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import About from "@/models/About";

import cloudinary from "@/lib/cloudinary";

// GET ABOUT 
export async function GET() {
  try {
    await connectDB();

    const about = await About.findOne();
    return NextResponse.json(about);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Failed to Fetch About",
      },
      {
        status: 500,
      }
    );
  }
}

// UPDATE ABOUT
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const existingAbout = await About.findOne();

    // UPDATE EXISTING
    if (existingAbout) {
      // DELETE OLD IMAGE FROM CLOUDINARY WHEN REPLACED
      if (
        body.image &&
        body.imagePublicId &&
        existingAbout.imagePublicId &&
        body.imagePublicId !== existingAbout.imagePublicId
      ) {
        await cloudinary.uploader.destroy(existingAbout.imagePublicId, {
          resource_type: "image",
        });
      }

      const updatedAbout = await About.findByIdAndUpdate(
        existingAbout._id,
        body,
        {
          new: true,
        }
      );

      return NextResponse.json({
        message: "About Updated Successfully",
        data: updatedAbout,
      });
    }

    // CREATE NEW
    const newAbout = await About.create(body);

    return NextResponse.json({
      message: "About Created Successfully",
      data: newAbout,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Failed to Update About",
      },
      {
        status: 500,
      }
    );
  }
}