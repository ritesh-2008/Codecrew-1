import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Feed(){
  const [projects, setprojects] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");

  useEffect(() => {
    const fecthproject = async() => {
      try {
        const res = await api.get("/getprojects");
        console.log(res.data)
        setprojects(res.data.projects);
      } catch(err) {
        console.error(err)
        seterror("Failed to load projects");
      } finally {
        setloading(false)
      }
    };
    fecthproject();
  }, [])

  const handlejoin = async (projectId) => {
    try {
      const res = await api.post(`/projects/${projectId}/join`)
      if(res.data.success) {
        alert("Joined successfully! 🎉")
      }
    } catch(err) {
      console.error(err)
      alert("Failed to join project");
    }
  };

  return (
    <main className="bg-linear-to-br from-gray-50 via-gray-100 to-gray-50 min-h-screen py-6 sm:py-8 lg:py-10 px-2 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-10 lg:mb-12 text-center">
          <div className="inline-block bg-linear-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent mb-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight">
              Discover Projects
            </h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mt-4 leading-relaxed max-w-2xl mx-auto">
            Find amazing projects to collaborate on and grow with the community
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl sm:text-8xl animate-bounce mb-4">🔍</div>
            <p className="text-lg sm:text-2xl text-gray-600 font-semibold">Loading projects...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-linear-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-2xl p-6 sm:p-8 mb-8 animate-pulse">
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="text-4xl">⚠️</span>
              <div>
                <p className="text-lg sm:text-xl text-red-800 font-bold mb-1">Something went wrong</p>
                <p className="text-sm sm:text-base text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {projects.map(project => (
              <div 
                key={project._id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-white/20 overflow-hidden group hover:translate-y-0.5"
              >
                {/* Card Header */}
                <div className="bg-linear-to-r from-rose-500/10 to-pink-600/10 p-4 sm:p-5 lg:p-6 border-b border-gray-100">
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-rose-600 transition-colors">
                    {project.title}
                  </h2>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
                  {/* Description */}
                  <div>
                    <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Skills Section */}
                  {project.skills && (
                    <div className="space-y-1.5 sm:space-y-2">
                      <p className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                        <span>💡</span>
                        <span>Skills</span>
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {Array.isArray(project.skills) 
                          ? project.skills.slice(0, 3).map((skill, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-1 text-xs bg-linear-to-r from-rose-100 to-pink-100 text-rose-700 rounded-full font-semibold border border-rose-200 hover:border-rose-400 transition-all"
                            >
                              {skill}
                            </span>
                          ))
                          : <span className="text-xs text-gray-500 italic">{project.skills}</span>
                        }
                      </div>
                    </div>
                  )}

                  {/* Creator Info */}
                  <div className="pt-1.5 sm:pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500 flex items-center gap-1.5">
                      <span>👤</span>
                      <span className="font-semibold text-gray-700 truncate">{project.createdBy || "Unknown"}</span>
                    </p>
                  </div>

                  {/* Join Button */}
                  <button 
                    onClick={() => handlejoin(project._id)}
                    className="w-full px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm lg:text-base font-bold text-white bg-linear-to-r from-rose-600 to-pink-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:from-rose-700 hover:to-pink-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-white transform"
                  >
                    <span className="flex items-center justify-center gap-1 sm:gap-2">
                      <span>Join</span>
                      <span className="text-sm sm:text-base">🚀</span>
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : !loading && (
          <div className="text-center py-20">
            <div className="text-7xl sm:text-8xl mb-4">📭</div>
            <p className="text-xl sm:text-2xl text-gray-600 font-semibold mb-2">No projects available yet</p>
            <p className="text-base sm:text-lg text-gray-500">Be the first to create a project!</p>
          </div>
        )}
      </div>
    </main>
  );
}