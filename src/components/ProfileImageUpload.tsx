
"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Trash2, UserRound } from "lucide-react";

interface ProfileImageUploadProps {
  initialImage?: string;
  onImageChange?: (file: File | null) => void;
}

export default function ProfileImageUpload({
  initialImage,
  onImageChange,
}: ProfileImageUploadProps) {
  return (
    <ProfileImageUploadState
      key={initialImage ?? ""}
      initialImage={initialImage}
      onImageChange={onImageChange}
    />
  );
}

function ProfileImageUploadState({
  initialImage,
  onImageChange,
}: ProfileImageUploadProps) {
  const [preview, setPreview] = useState(initialImage ?? "");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG and WebP images are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Image size must be less than 2 MB.");
      event.target.value = "";
      return;
    }

    const newPreview = URL.createObjectURL(file);

    setPreview(newPreview);
    setError("");
    onImageChange?.(file);
  };

  const handleRemove = () => {
    setPreview("");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    onImageChange?.(null);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-lg font-semibold text-white">
        Profile Picture
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        Update your profile photo.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-5">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-slate-700 bg-slate-800">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Profile preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <UserRound
              size={42}
              className="text-slate-500"
            />
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 cursor-pointer"
          >
            <Camera size={17} />
            {preview ? "Change Photo" : "Upload Photo"}
          </button>

          {preview && (
            <button
              type="button"
              onClick={handleRemove}
              className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
            >
              <Trash2 size={17} />
              Remove
            </button>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      <p className="mt-4 text-xs text-slate-500">
        JPG, PNG or WebP. Maximum file size: 2 MB.
      </p>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
