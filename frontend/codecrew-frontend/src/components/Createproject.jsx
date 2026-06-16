import { useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom";

export default function CreateProject(){
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [skills, setskills] = useState("");
    const [location, setlocation] = useState("");
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState("");
    const [success, setsuccess] = useState("");
    const navigate = useNavigate();

    const handlecreate = async(e) => {
        e.preventDefault();
        
        // Validation
        if (!title.trim()) {
            seterror("Project title is required");
            return;
        }
        if (!description.trim()) {
            seterror("Project description is required");
            return;
        }
        if (description.length < 20) {
            seterror("Description must be at least 20 characters");
            return;
        }

        setloading(true);
        seterror("");
        setsuccess("");

        try {
            const skillsArray = skills.split(",").map(s => s.trim()).filter(s => s);
            const res = await api.post("/createprojects", {
                title,
                description,
                skills: skillsArray,
                location
            });
            
            if(res.data.success) {
                setsuccess("Project created successfully! 🎉");
                setTimeout(() => {
                    navigate("/feed");
                }, 1500);
            }
        } catch(err) {
            seterror(err.response?.data?.message || "Failed to create project");
        } finally {
            setloading(false);
        }
    }

    return (
        <main className="bg-linear-to-br from-gray-50 via-gray-100 to-gray-50 flex min-h-screen w-full flex-col items-center justify-center px-3 py-8 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm sm:max-w-lg lg:max-w-2xl space-y-6 sm:space-y-8 lg:space-y-12">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <div className="inline-block bg-linear-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black leading-tight">
                            Create Project
                        </h1>
                    </div>
                    <div className="space-y-2">
                        <p className="text-base sm:text-lg lg:text-2xl text-gray-600 leading-relaxed">
                            Build something amazing and find collaborators
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-12 space-y-6 sm:space-y-8 lg:space-y-10 border border-white/20">
                    
                    {/* Success Message */}
                    {success && (
                        <div className="bg-linear-to-r from-green-50 to-emerald-100 border-l-4 border-green-500 rounded-xl p-4 sm:p-6 lg:p-8 animate-pulse">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <span className="text-green-600 text-2xl sm:text-3xl lg:text-4xl">✅</span>
                                <p className="text-sm sm:text-lg lg:text-xl text-green-800 font-medium leading-relaxed">{success}</p>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="bg-linear-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-xl p-4 sm:p-6 lg:p-8 animate-pulse">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <span className="text-red-600 text-2xl sm:text-3xl lg:text-4xl">⚠️</span>
                                <p className="text-sm sm:text-lg lg:text-xl text-red-800 font-medium leading-relaxed">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form className="space-y-6 sm:space-y-8 lg:space-y-10" onSubmit={handlecreate}>
                        
                        {/* Project Title */}
                        <div className="space-y-3 sm:space-y-4 lg:space-y-5 group">
                            <label className="block text-sm sm:text-xl lg:text-2xl font-bold text-gray-800">
                                <span className="bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                    Project Title
                                </span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-linear-to-b from-rose-500 to-pink-600 rounded-l-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-300"></div>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => settitle(e.target.value)}
                                    placeholder="e.g., AI Chat Application"
                                    maxLength="100"
                                    required
                                    className="w-full px-4 sm:px-6 lg:px-8 py-2.5 sm:py-4 lg:py-5 text-sm sm:text-lg lg:text-2xl rounded-2xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-rose-300 hover:bg-white focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-200 disabled:bg-gray-100 disabled:cursor-not-allowed focus:shadow-lg"
                                />
                                <span className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 text-lg sm:text-3xl lg:text-4xl">📋</span>
                            </div>
                        </div>

                        {/* Project Description */}
                        <div className="space-y-3 sm:space-y-4 lg:space-y-5 group">
                            <label className="block text-sm sm:text-xl lg:text-2xl font-bold text-gray-800">
                                <span className="bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                    Description
                                </span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-linear-to-b from-rose-500 to-pink-600 rounded-l-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-300"></div>
                                <textarea
                                    value={description}
                                    onChange={(e) => setdescription(e.target.value)}
                                    placeholder="Describe your project idea, goals, and what you're looking for..."
                                    maxLength="500"
                                    rows="5"
                                    required
                                    className="w-full px-4 sm:px-6 lg:px-8 py-2.5 sm:py-4 lg:py-5 text-sm sm:text-lg lg:text-2xl rounded-2xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-rose-300 hover:bg-white focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-200 disabled:bg-gray-100 disabled:cursor-not-allowed focus:shadow-lg resize-none"
                                />
                                <span className="absolute right-4 sm:right-6 lg:right-8 top-6 sm:top-8 lg:top-10 text-lg sm:text-3xl lg:text-4xl">✍️</span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-500">{description.length}/500 characters</p>
                        </div>

                        {/* Required Skills */}
                        <div className="space-y-3 sm:space-y-4 lg:space-y-5 group">
                            <label className="block text-sm sm:text-xl lg:text-2xl font-bold text-gray-800">
                                <span className="bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                    Required Skills
                                </span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-linear-to-b from-rose-500 to-pink-600 rounded-l-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-300"></div>
                                <input
                                    type="text"
                                    value={skills}
                                    onChange={(e) => setskills(e.target.value)}
                                    placeholder="React, Node.js, Python (separate with commas)"
                                    className="w-full px-4 sm:px-6 lg:px-8 py-2.5 sm:py-4 lg:py-5 text-sm sm:text-lg lg:text-2xl rounded-2xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-rose-300 hover:bg-white focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-200 disabled:bg-gray-100 disabled:cursor-not-allowed focus:shadow-lg"
                                />
                                <span className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 text-lg sm:text-3xl lg:text-4xl">💡</span>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-3 sm:space-y-4 lg:space-y-5 group">
                            <label className="block text-sm sm:text-xl lg:text-2xl font-bold text-gray-800">
                                <span className="bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                    Location (Optional)
                                </span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-linear-to-b from-rose-500 to-pink-600 rounded-l-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-300"></div>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setlocation(e.target.value)}
                                    placeholder="Remote, New York, USA..."
                                    className="w-full px-4 sm:px-6 lg:px-8 py-2.5 sm:py-4 lg:py-5 text-sm sm:text-lg lg:text-2xl rounded-2xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-rose-300 hover:bg-white focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-200 disabled:bg-gray-100 disabled:cursor-not-allowed focus:shadow-lg"
                                />
                                <span className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 text-lg sm:text-3xl lg:text-4xl">📍</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-5 lg:py-6 mt-6 sm:mt-8 lg:mt-10 text-base sm:text-2xl lg:text-3xl font-bold text-white bg-linear-to-r from-rose-600 to-pink-600 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:from-rose-700 hover:to-pink-700 active:scale-95 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-white transform hover:translate-y-0.5"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2 sm:gap-3">
                                    <span className="inline-block animate-spin text-lg sm:text-2xl lg:text-3xl">⏳</span>
                                    Creating project...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2 sm:gap-3">
                                    <span>Create Project</span>
                                    <span className="text-lg sm:text-2xl lg:text-3xl">🚀</span>
                                </span>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer Note */}
                <p className="text-center text-xs sm:text-base lg:text-lg text-gray-500 leading-relaxed">
                    ✨ Your project will be visible to the community immediately
                </p>
            </div>
        </main>
    );
}