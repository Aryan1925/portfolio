import { connectDB } from "@/lib/mongodb";
import Resume from "@/models/Resume";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  try {
    await connectDB();

    const resume = await Resume.findOne().sort({
      createdAt: -1,
    });

    return Response.json({
      success: true,
      data: resume,
    });

  } catch (error) {

    console.log(error);

    return Response.json({
      success: false,
    });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const file = formData.get("file");

    // NEW FIELDS
    const title =
      formData.get("title");

    const projects =
      formData.get("projects");

    const experience =
      formData.get("experience");

    const technologies =
      formData.get("technologies");

    const descriptionOne =
      formData.get("descriptionOne");

    const descriptionTwo =
      formData.get("descriptionTwo");

    const highlights = JSON.parse(
      formData.get("highlights") || "[]"
    );

    if (!file) {
      return Response.json({
        success: false,
        message: "No file uploaded",
      });
    }

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const base64File =
      `data:application/pdf;base64,${buffer.toString("base64")}`;

    // CLOUDINARY UPLOAD
    const uploadResult =
      await cloudinary.uploader.upload(
        base64File,
        {
          resource_type: "raw",
          folder: "resumes",
          public_id: `resume-${Date.now()}`,
          format: "pdf",
          access_mode: "public",
          type: "upload",
        }
      );

    // DELETE OLD RESUME
    const oldResume =
      await Resume.findOne();

    if (
      oldResume &&
      oldResume.publicId
    ) {

      await cloudinary.uploader.destroy(
        oldResume.publicId,
        {
          resource_type: "raw",
        }
      );
    }

    // REMOVE OLD DOCUMENTS
    await Resume.deleteMany();

    // SAVE NEW RESUME
    const saved =
      await Resume.create({
        fileName: file.name,
        fileUrl:
          uploadResult.secure_url,
        publicId:
          uploadResult.public_id,

        // NEW DATA
        title,
        projects,
        experience,
        technologies,

        descriptionOne,
        descriptionTwo,

        highlights,
      });

    return Response.json({
      success: true,
      data: saved,
    });

  } catch (err) {

    console.log(err);

    return Response.json({
      success: false,
      error: err.message,
    });
  }
}

export async function DELETE() {
  try {
    await connectDB();

    // GET CURRENT RESUME
    const currentResume =
      await Resume.findOne();

    // DELETE FROM CLOUDINARY
    if (
      currentResume &&
      currentResume.publicId
    ) {

      await cloudinary.uploader.destroy(
        currentResume.publicId,
        {
          resource_type: "raw",
        }
      );
    }

    // DELETE FROM DATABASE
    await Resume.deleteMany();

    return Response.json({
      success: true,
    });

  } catch (err) {

    console.log(err);

    return Response.json({
      success: false,
    });
  }
}

export async function PATCH(req) {
  try {

    await connectDB();

    const body = await req.json();

    let resume = await Resume.findOne();

    if (!resume) {

      resume = await Resume.create({
        title: "",
      });
    }

    resume.title = body.title;
    resume.projects = body.projects;
    resume.experience = body.experience;
    resume.technologies = body.technologies;
    resume.highlights = body.highlights;
    resume.description1 = body.description1;
    resume.description2 = body.description2;

    await resume.save();

    return Response.json({
      success: true,
      data: resume,
    });

  } catch (error) {

    console.log(error);

    return Response.json({
      success: false,
      message: error.message,
    });
  }
}