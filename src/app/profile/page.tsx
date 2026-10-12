
"use client";

import { useState } from "react";
import { MapPin, Code2, Pencil, Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile] = useState({
    name: "Naimur Rahman",
    username: "naimur",
    bio: "Learning Web Development with React, Next.js and TypeScript. Building projects and improving every day.",
    location: "Rajshahi, Bangladesh",
    skills: ["React", "Next.js", "TypeScript"],
  });

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-emerald-400">
            PROFILE MANAGEMENT
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your personal information and developer profile.
          </p>
        </div>

        {/* Profile Card */}
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
          {/* Cover */}
          <div className="h-36 bg-linear-to-r from-emerald-600 via-teal-700 to-cyan-800 sm:h-48" />

          <div className="px-5 pb-7 sm:px-8">
            {/* Avatar and Edit Button */}
            <div className="-mt-12 flex flex-wrap items-end justify-between gap-4 sm:-mt-16">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-slate-900 bg-slate-800 text-3xl font-bold text-emerald-400 sm:h-32 sm:w-32 sm:text-4xl">
                {profile.name.charAt(0).toUpperCase()}
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-emerald-400 cursor-pointer"
              >
                <Pencil size={17} />
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </button>
            </div>

            {/* Profile Information */}
            <div className="mt-5">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold sm:text-3xl">
                  {profile.name}
                </h2>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  Developer in progress
                </span>
              </div>

              <p className="mt-1 text-slate-400">@{profile.username}</p>

              <p className="mt-5 max-w-2xl leading-7 text-slate-300">
                {profile.bio}
              </p>

              {/* Location */}
              <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">
                <MapPin size={17} />
                <span>{profile.location}</span>
              </div>

              {/* Skills */}
              <div className="mt-7">
                <h3 className="mb-3 flex items-center gap-2 font-semibold">
                  <Code2 size={18} className="text-emerald-400" />
                  Skills
                </h3>

                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
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
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
