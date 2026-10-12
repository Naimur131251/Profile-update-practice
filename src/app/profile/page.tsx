import React from "react";

const ProfilePage = () => {
  return (
    <div className="max-w-md mx-auto bg-gray-300 rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 my-8 border border-gray-100">
      <div className="flex flex-col items-center text-center">
        <div className="h-24 w-24 rounded-full bg-linear-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4">
          JD
        </div>

        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
          John Doe
        </h2>
        <p className="text-sm text-indigo-600 font-medium mb-3">@johndoe</p>

        <p className="text-gray-600 text-base max-w-sm leading-relaxed mb-6">
          ✨ Full Stack Developer & UI/UX enthusiast. Passionate about building
          beautiful, scalable web applications and exploring new technologies.
          🚀
        </p>

        <button className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg shadow-sm transition duration-200 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
