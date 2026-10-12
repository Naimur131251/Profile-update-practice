"use client";

import { useState } from "react";
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

interface IProfile {
  name: string;
  username: string;
  bio: string;
  location: string;
  skills: string;
}

const initialProfile: IProfile = {
  name: "Naimur Rahman",
  username: "naimur",
  bio: "Learning Web Development with React, Next.js and TypeScript. Building projects and improving every day.",
  location: "Rajshahi, Bangladesh",
  skills: "React, Next.js, TypeScript",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<IProfile>(initialProfile);
  const [formData, setFormData] = useState<IProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleEdit = () => {
    setFormData({ ...profile });
    setIsEditing(true);
    setIsSaved(false);
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setProfile({
      ...formData,
      name: formData.name.trim(),
      username: formData.username.trim(),
      bio: formData.bio.trim(),
      location: formData.location.trim(),
      skills: formData.skills.trim(),
    });

    setIsEditing(false);
    setIsSaved(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-emerald-400">
            PROFILE MANAGEMENT
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl">My Profile</h1>

          <p className="mt-2 text-slate-400">
            Manage your personal information and developer profile.
          </p>
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
          <div className="h-36 bg-linear-to-r from-emerald-600 via-teal-700 to-cyan-800 sm:h-48" />

          <div className="px-5 pb-7 sm:px-8">
            <div className="-mt-12 flex flex-wrap items-end justify-between gap-4 sm:-mt-16">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-slate-900 bg-slate-800 text-3xl font-bold text-emerald-400 sm:h-32 sm:w-32 sm:text-4xl">
                {profile.name.charAt(0).toUpperCase() || "U"}
              </div>

              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-emerald-400 cursor-pointer"
                >
                  <Pencil size={17} />
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <h2 className="text-2xl font-bold">Edit Profile</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Update your information below.
                  </p>
                </div>

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

                <div className="flex flex-wrap gap-3 border-t border-slate-800 pt-5">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-emerald-400 cursor-pointer"
                  >
                    <Save size={17} />
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-5 py-2.5 font-medium transition hover:bg-slate-800 cursor-pointer"
                  >
                    <X size={17} />
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
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
