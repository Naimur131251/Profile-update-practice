import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import type { Collection, Document } from "mongodb";

interface ProfileDocument extends Document {
  _id: string;
  name: string;
  username: string;
  bio: string;
  location: string;
  skills: string[];
  image: string;
  updatedAt: Date;
}

async function getCollection(): Promise<Collection<ProfileDocument>> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || "profilehub");

  return db.collection<ProfileDocument>("profiles");
}

// GET: saved profile load
export async function GET() {
  try {
    const collection = await getCollection();
    const profile = await collection.findOne({ _id: "main-profile" });

    if (!profile) {
      return NextResponse.json({ profile: null });
    }

    return NextResponse.json({
      profile: {
        ...profile,
        skills: profile.skills.join(", "),
      },
    });
  } catch (error) {
    console.error("Profile GET error:", error);
    return NextResponse.json(
      { error: "Failed to load profile" },
      { status: 500 },
    );
  }
}

// PUT: save or update profile
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const fields = ["name", "username", "bio", "location", "image"];

    for (const field of fields) {
      if (typeof body[field] !== "string") {
        return NextResponse.json(
          { error: `Invalid ${field}` },
          { status: 400 },
        );
      }
    }

    const skills: string[] =
      typeof body.skills === "string"
        ? body.skills
            .split(",")
            .map((skill: string) => skill.trim())
            .filter(Boolean)
        : Array.isArray(body.skills)
          ? body.skills.filter(
              (skill: unknown): skill is string => typeof skill === "string",
            )
          : [];

    const profileData = {
      name: body.name.trim(),
      username: body.username.trim(),
      bio: body.bio.trim(),
      location: body.location.trim(),
      skills,
      image: body.image.trim(),
      updatedAt: new Date(),
    };

    const collection = await getCollection();

    await collection.updateOne(
      { _id: "main-profile" },
      {
        $set: profileData,
        $setOnInsert: { _id: "main-profile" },
      },
      { upsert: true },
    );

    const savedProfile = await collection.findOne({
      _id: "main-profile",
    });

    return NextResponse.json({
      message: "Profile saved successfully",
      profile: {
        ...savedProfile,
        skills: savedProfile?.skills.join(", ") ?? "",
      },
    });
  } catch (error) {
    console.error("Profile PUT error:", error);
    return NextResponse.json(
      { error: "Failed to save profile" },
      { status: 500 },
    );
  }
}
