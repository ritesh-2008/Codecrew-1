import { useState } from "react"
import useauth from "../hooks/usehook";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [skills, setskills] = useState("");
    const [location, setlocation] = useState("");
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { register } = useauth();
    const navigate = useNavigate();

    const handle = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!username.trim()) {
            seterror("Username is required");
            return;
        }
        if (!email.trim()) {
            seterror("Email is required");
            return;
        }
        if (!password.trim()) {
            seterror("Password is required");
            return;
        }
        if (password.length < 6) {
            seterror("Password must be at least 6 characters");
            return;
        }

        setloading(true);
        seterror("");

        const res = await register(username, email, password, skills, location)
        if (res.success) {
            navigate("/home")
        } else {
            seterror(res.error || "Registration failed")
        }
        setloading(false);
    }

    return (
        <main className="bg-linear-to-br from-gray-50 via-gray-100 to-gray-50 flex min-h-screen w-full flex-col items-center justify-center px-3 py-8 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm sm:max-w-lg lg:max-w-2xl space-y-6 sm:space-y-8 lg:space-y-12">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <div className="inline-block bg-linear-to-r#002b33<<< to-pink-600 bg-clip-text text-transparent">
                        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black leading-tight">CodeCrew</h1>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-xl sm:text-3xl lg:text-5xl font-bold text-gray-900 leading-snug">
                            Join the crew
                        </h3>
                        <p className="text-sm sm:text-lg lg:text-2xl text-gray-600 leading-relaxed">
                            Create your account and start collaborating
                        </p>
                        <p className="text-xs sm:text-base lg:text-lg text-gray-500">
                            Already have an account?{' '}
                            <Link
                                to={"/login"}
                                className="font-bold text-rose-600 hover:text-rose-500 hover:underline transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Form Card with Modern Design */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-12 space-y-6 sm:space-y-8 lg:space-y-10 border border-white/20">
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
                    <form className="space-y-6 sm:space-y-8 lg:space-y-10" onSubmit={handle}>
                        {/* Username Input */}
                        <div className="space-y-3 sm:space-y-4 lg:space-y-5 group">
                            <label className="block text-sm sm:text-xl lg:text-2xl font-bold text-gray-800">
                                <span className="bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                    Username
                                </span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-linear-to-b from-rose-500 to-pink-600 rounded-l-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-300"></div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setusername(e.target.value)}
                                    placeholder="your_username"
                                    required
                                    className="w-full px-4 sm:px-6 lg:px-8 py-2.5 sm:py-4 lg:py-5 text-sm sm:text-lg lg:text-2xl rounded-2xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-rose-300 hover:bg-white focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-200 disabled:bg-gray-100 disabled:cursor-not-allowed focus:shadow-lg"
                                />
                                <span className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 text-lg sm:text-3xl lg:text-4xl transition-all opacity-100">👤</span>
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-3 sm:space-y-4 lg:space-y-5 group">
                            <label className="block text-sm sm:text-xl lg:text-2xl font-bold text-gray-800">
                                <span className="bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                    Email Address
                                </span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-linear-to-b from-rose-500 to-pink-600 rounded-l-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-300"></div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full px-4 sm:px-6 lg:px-8 py-2.5 sm:py-4 lg:py-5 text-sm sm:text-lg lg:text-2xl rounded-2xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-rose-300 hover:bg-white focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-200 disabled:bg-gray-100 disabled:cursor-not-allowed focus:shadow-lg"
                                />
                                <span className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 text-lg sm:text-3xl lg:text-4xl transition-all opacity-100">✉️</span>
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-3 sm:space-y-4 lg:space-y-5 group">
                            <label className="block text-sm sm:text-xl lg:text-2xl font-bold text-gray-800">
                                <span className="bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                    Password
                                </span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-linear-to-b from-rose-500 to-pink-600 rounded-l-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-300"></div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full px-4 sm:px-6 lg:px-8 py-2.5 sm:py-4 lg:py-5 text-sm sm:text-lg lg:text-2xl rounded-2xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-rose-300 hover:bg-white focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-200 disabled:bg-gray-100 disabled:cursor-not-allowed focus:shadow-lg pr-14 sm:pr-16 lg:pr-20"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 text-lg sm:text-3xl lg:text-4xl transition-all hover:scale-110 focus:outline-none"
                                >
                                    {showPassword ? "👁️" : "👁️‍🗨️"}
                                </button>
                            </div>
                        </div>

                        {/* Skills Input */}
                        <div className="space-y-3 sm:space-y-4 lg:space-y-5 group">
                            <label className="block text-sm sm:text-xl lg:text-2xl font-bold text-gray-800">
                                <span className="bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                    Skills (Optional)
                                </span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-linear-to-b from-rose-500 to-pink-600 rounded-l-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-300"></div>
                                <input
                                    type="text"
                                    value={skills}
                                    onChange={(e) => setskills(e.target.value)}
                                    placeholder="React, Node.js, Python..."
                                    className="w-full px-4 sm:px-6 lg:px-8 py-2.5 sm:py-4 lg:py-5 text-sm sm:text-lg lg:text-2xl rounded-2xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-rose-300 hover:bg-white focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-200 disabled:bg-gray-100 disabled:cursor-not-allowed focus:shadow-lg"
                                />
                                <span className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 text-lg sm:text-3xl lg:text-4xl transition-all opacity-100">💡</span>
                            </div>
                        </div>

                        {/* Location Input */}
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
                                    placeholder="New York, USA"
                                    className="w-full px-4 sm:px-6 lg:px-8 py-2.5 sm:py-4 lg:py-5 text-sm sm:text-lg lg:text-2xl rounded-2xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-rose-300 hover:bg-white focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-200 disabled:bg-gray-100 disabled:cursor-not-allowed focus:shadow-lg"
                                />
                                <span className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 text-lg sm:text-3xl lg:text-4xl transition-all opacity-100">📍</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-5 lg:py-6 mt-10 sm:mt-14 lg:mt-18 text-base sm:text-2xl lg:text-3xl font-bold text-white bg-linear-to-r from-rose-600 to-pink-600 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:from-rose-700 hover:to-pink-700 active:scale-95 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-white transform hover:translate-y-0.5"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2 sm:gap-3">
                                    <span className="inline-block animate-spin text-lg sm:text-2xl lg:text-3xl">⏳</span>
                                    Creating account...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2 sm:gap-3">
                                    <span>Create Account</span>
                                    <span className="text-lg sm:text-2xl lg:text-3xl">🚀</span>
                                </span>
                            )}
                        </button>
                    </form>

                    {/* Terms Link */}
                    <div className="text-center pt-4 sm:pt-6 border-t-2 border-gray-200">
                        <p className="text-xs sm:text-base lg:text-lg text-gray-500 leading-relaxed">
                            By creating an account, you agree to our{' '}
                            <a href="#" className="font-semibold text-rose-600 hover:text-rose-700 hover:underline transition-colors">
                                Terms and Privacy Policy
                            </a>
                        </p>
                    </div>
                </div>

                {/* Footer Note */}
                <p className="text-center text-xs sm:text-base lg:text-lg text-gray-500 leading-relaxed">
                    🔒 Your data is secure and encrypted
                </p>
            </div>
        </main>
    );
}
        
