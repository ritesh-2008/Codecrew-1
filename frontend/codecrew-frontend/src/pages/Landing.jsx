import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <main className="bg-linear-to-br from-gray-50 via-gray-100 to-gray-50 flex min-h-screen w-full flex-col items-center justify-center px-3 py-8 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm sm:max-w-2xl lg:max-w-4xl space-y-8 sm:space-y-12 lg:space-y-16 text-center">
                {/* Logo Section */}
                <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                    <div className="inline-block bg-linear-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                        <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black leading-tight">
                            CodeCrew
                        </h1>
                    </div>
                    
                    <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-center">
                        <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            Collaborate with Developers Worldwide
                        </h2>
                        <p className="text-base text-center sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            Join CodeCrew to build amazing projects, share ideas, and grow your skills with a community of passionate developers.
                        </p>
                    </div>
                </div>

                {/* Main Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 py-8 sm:py-12 lg:py-16">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/20 shadow-lg hover:shadow-xl transition-all">
                        <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">💡</div>
                        <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                            Share Ideas
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                            Post your project ideas and find collaborators who share your vision.
                        </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/20 shadow-lg hover:shadow-xl transition-all">
                        <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">🤝</div>
                        <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                            Collaborate
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                            Work together on projects and build incredible things as a team.
                        </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/20 shadow-lg hover:shadow-xl transition-all">
                        <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">🚀</div>
                        <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                            Grow Skills
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                            Learn from experienced developers and level up your coding abilities.
                        </p>
                    </div>
                </div>

                {/* CTA Buttons Section */}
                <div className="space-y-6 sm:space-y-8 lg:space-y-10 pt-8 sm:pt-12 lg:pt-16">
                    <p className="text-base sm:text-lg lg:text-xl text-gray-700 font-semibold">
                        Ready to join the crew? 🎯
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center items-center w-full">
                        {/* Register Button (Primary) */}
                        <Link
                            to="/register"
                            className="w-full sm:w-auto px-6 sm:px-10 lg:px-14 py-4 sm:py-5 lg:py-6 text-lg sm:text-2xl lg:text-3xl font-bold text-white bg-linear-to-r from-rose-600 to-pink-600 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:from-rose-700 hover:to-pink-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-white transform hover:translate-y-0.5 text-center inline-block"
                        >
                            <span className="flex items-center justify-center gap-2 sm:gap-3">
                                <span>Create Account</span>
                                <span className="text-lg sm:text-2xl lg:text-3xl">📝</span>
                            </span>
                        </Link>

                        {/* Login Button (Secondary) */}
                        <Link
                            to="/login"
                            className="w-full sm:w-auto px-6 sm:px-10 lg:px-14 py-4 sm:py-5 lg:py-6 text-lg sm:text-2xl lg:text-3xl font-bold text-rose-600 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-rose-600 hover:bg-rose-50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-white transform hover:translate-y-0.5 text-center inline-block"
                        >
                            <span className="flex items-center justify-center gap-2 sm:gap-3">
                                <span>Already a member?</span>
                                <span className="text-lg sm:text-2xl lg:text-3xl">👤</span>
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Footer Stats */}
                <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-12 sm:pt-16 lg:pt-20 border-t border-gray-200">
                    <div className="space-y-2 text-center">
                        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                            500+
                        </p>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                            Active Members
                        </p>
                    </div>
                    <div className="space-y-2 text-center">
                        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                            100+
                        </p>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                            Projects Created
                        </p>
                    </div>
                    <div className="space-y-2 text-center">
                        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                            50+
                        </p>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                            Active Crews
                        </p>
                    </div>
                </div>

                {/* Security Badge */}
                <div className="pt-8 sm:pt-12 lg:pt-16">
                    <p className="text-xs sm:text-sm lg:text-base text-gray-500 flex items-center justify-center gap-2">
                        <span>🔒</span>
                        <span>Your data is secure and encrypted</span>
                    </p>
                </div>
            </div>
        </main>
    );
}
