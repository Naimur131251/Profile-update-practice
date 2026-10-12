import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No image selected" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid image format" },
        { status: 400 },
      );
    }

    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image must be under 2 MB" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profilehub/avatars" },
          (error, result) => {
            if (error) return reject(error);

            if (!result) {
              return reject(new Error("Upload failed"));
            }

            resolve({ secure_url: result.secure_url });
          },
        );

        stream.end(buffer);
      },
    );

    return NextResponse.json({
      imageUrl: result.secure_url,
    });
  } catch (error: unknown) {
    console.error("Cloudinary upload error:", error);

    let message = "Unknown upload error";

    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "string") {
      message = error;
    } else {
      try {
        message = JSON.stringify(error);
      } catch {
        message = String(error);
      }
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
