"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Code2,
  Pencil,
  Globe,
  X,
  Save,
  CheckCircle2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import ProfileImageUpload from "@/components/ProfileImageUpload";

interface IProfile {
  name: string;
  username: string;
  bio: string;
  location: string;
  skills: string;
  image: string;
}

const initialProfile: IProfile = {
  name: "Naimur Rahman",
  username: "naimur",
  bio: "Learning Web Development with React, Next.js and TypeScript. Building projects and improving every day.",
  location: "Rajshahi, Bangladesh",
  skills: "React, Next.js, TypeScript",
  image: "",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<IProfile>(initialProfile);
  const [formData, setFormData] = useState<IProfile>(initialProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [draftImage, setDraftImage] = useState("");
  const [draftFile, setDraftFile] = useState<File | null>(null);

  const [imageEditorKey, setImageEditorKey] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Start editing the profile
  const handleEdit = () => {
    setFormData({ ...profile });
    setDraftImage(profile.image);
    setDraftFile(null);
    setUploadError("");
    setImageEditorKey((key) => key + 1);
    setIsEditing(true);
    setIsSaved(false);
  };

  // Cancel editing and discard changes
  const handleCancel = () => {
    setFormData({ ...profile });
    setDraftImage(profile.image);
    setDraftFile(null);
    setUploadError("");
    setImageEditorKey((key) => key + 1);
    setIsEditing(false);
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Upload image and save profile

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsUploading(true);
    setUploadError("");
    setIsSaved(false);

    try {
      // 1. Existing image URL ধরে রাখি
      let imageUrl = formData.image;

      // 2. নতুন ছবি থাকলে Cloudinary-তে upload করি
      if (draftFile) {
        const uploadData = new FormData();
        uploadData.append("file", draftFile);

        const uploadResponse = await fetch("/api/upload/profile", {
          method: "POST",
          body: uploadData,
        });

        const uploadResult = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(
            uploadResult.error || uploadResult.message || "Image upload failed",
          );
        }

        imageUrl = uploadResult.imageUrl;
      }

      // 3. সব profile data MongoDB API-তে পাঠাই
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Profile save failed");
      }

      // 4. Database থেকে পাওয়া saved data দিয়ে UI update করি
      setProfile(result.profile);
      setFormData(result.profile);
      setDraftImage(result.profile.image);
      setDraftFile(null);
      setIsEditing(false);
      setIsSaved(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      setUploadError(message);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch("/api/profile");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to load profile");
        }

        if (result.profile) {
          setProfile(result.profile);
          setFormData(result.profile);
          setDraftImage(result.profile.image);
        }
      } catch (error) {
        console.error("Profile load error:", error);
      }
    }

    loadProfile();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        {/* Page heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-emerald-400">
            PROFILE MANAGEMENT
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl">My Profile</h1>

          <p className="mt-2 text-slate-400">
            Manage your personal information and developer profile.
          </p>
        </div>

        {/* Profile card */}
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
          {/* Cover */}
          <div className="h-36 bg-linear-to-r from-emerald-600 via-teal-700 to-cyan-800 sm:h-48" />

          <div className="px-5 pb-7 sm:px-8">
            {/* Avatar and edit button */}
            <div className="-mt-12 flex flex-wrap items-end justify-between gap-4 sm:-mt-16">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-slate-900 bg-slate-800 text-3xl font-bold text-emerald-400 sm:h-32 sm:w-32 sm:text-4xl">
                {profile.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.image}
                    alt={`${profile.name}'s profile`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  profile.name.charAt(0).toUpperCase() || "U"
                )}
              </div>

              {!isEditing && (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  <Pencil size={17} />
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              /* Edit form */
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <h2 className="text-2xl font-bold">Edit Profile</h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Update your information below.
                  </p>
                </div>

                {/* Full name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    maxLength={60}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-emerald-400"
                  />
                </div>

                {/* Username */}
                <div className="space-y-1.5">
                  <label htmlFor="username" className="text-sm font-medium">
                    Username
                  </label>

                  <input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    minLength={3}
                    maxLength={30}
                    pattern="[a-zA-Z0-9_]+"
                    title="Use letters, numbers and underscores only."
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-emerald-400"
                  />

                  <p className="text-xs text-slate-500">
                    Letters, numbers and underscores only.
                  </p>
                </div>

                {/* Bio */}
                <div className="space-y-1.5">
                  <label htmlFor="bio" className="text-sm font-medium">
                    Bio
                  </label>

                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    maxLength={250}
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full resize-y rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-emerald-400"
                  />

                  <p className="text-right text-xs text-slate-500">
                    {formData.bio.length}/250
                  </p>
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label htmlFor="location" className="text-sm font-medium">
                    Location
                  </label>

                  <input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    maxLength={100}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-emerald-400"
                  />
                </div>

                {/* Skills */}
                <div className="space-y-1.5">
                  <label htmlFor="skills" className="text-sm font-medium">
                    Skills
                  </label>

                  <input
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    maxLength={200}
                    placeholder="React, Next.js, TypeScript"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-emerald-400"
                  />

                  <p className="text-xs text-slate-500">
                    Separate skills with commas.
                  </p>
                </div>

                {/* Profile image upload */}
                <ProfileImageUpload
                  key={imageEditorKey}
                  initialImage={draftImage}
                  onImageChange={(file) => {
                    setDraftFile(file);
                    setUploadError("");

                    if (!file) {
                      setDraftImage("");
                    }
                  }}
                />

                {/* Upload error */}
                {uploadError && (
                  <p
                    role="alert"
                    className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
                  >
                    {uploadError}
                  </p>
                )}

                {/* Form actions */}
                <div className="flex flex-wrap gap-3 border-t border-slate-800 pt-5">
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Save size={17} />
                    {isUploading ? "Uploading..." : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isUploading}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-700 px-5 py-2.5 font-medium transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <X size={17} />
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              /* Profile details */
              <>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold sm:text-3xl">
                    {profile.name}
                  </h2>

                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                    Developer in progress
                  </span>
                </div>

                <p className="mt-1 text-slate-400">@{profile.username}</p>

                <p className="mt-5 max-w-2xl whitespace-pre-wrap leading-7 text-slate-300">
                  {profile.bio || "No bio added yet."}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">
                  <MapPin size={17} />
                  {profile.location || "Location not added"}
                </div>

                {/* Skills list */}
                <div className="mt-7">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold">
                    <Code2 size={18} className="text-emerald-400" />
                    Skills
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {profile.skills
                      .split(",")
                      .map((skill) => skill.trim())
                      .filter(Boolean)
                      .map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}

                    {!profile.skills.trim() && (
                      <p className="text-sm text-slate-500">
                        No skills added yet.
                      </p>
                    )}
                  </div>
                </div>

                {/* Social links */}
                <div className="mt-7 flex flex-wrap gap-3 border-t border-slate-800 pt-5">
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm transition hover:bg-slate-800"
                  >
                    <FaGithub size={17} />
                    GitHub
                  </a>

                  <a
                    href="https://example.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm transition hover:bg-slate-800"
                  >
                    <Globe size={17} />
                    Website
                  </a>
                </div>

                {/* Success message */}
                {isSaved && (
                  <p
                    role="status"
                    className="mt-5 flex items-center gap-2 text-sm text-emerald-400"
                  >
                    <CheckCircle2 size={18} />
                    Profile updated successfully!
                  </p>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
