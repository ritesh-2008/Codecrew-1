import { useState } from "react";
import useAuth from "../hooks/usehook"
import { useNavigate, Link } from "react-router-dom";


export default function Login() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handle = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!email.trim()) {
            setError("Email is required");
            return;
        }
        if (!password.trim()) {
            setError("Password is required");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        
        setLoading(true);
        setError("");
        try {
            const result = await login(email, password);
            if (result.success) {
                navigate("/feed");
            } else {
                setError(result.error || "login failed");
            }
        } catch {
            setError("something went wrong")
        }
        setLoading(false);
    }

    return (
        <main className="bg-linear-to-br from-gray-50 via-gray-100 to-gray-50 flex min-h-screen w-full flex-col items-center justify-center px-3 py-8 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm sm:max-w-lg lg:max-w-2xl space-y-6 sm:space-y-8 lg:space-y-12">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <div className="inline-block bg-linear-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black leading-tight">CodeCrew</h1>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-xl sm:text-3xl lg:text-5xl font-bold text-gray-900 leading-snug">
                            Welcome back
                        </h3>
                        <p className="text-sm sm:text-lg lg:text-2xl text-gray-600 leading-relaxed">
                            Sign in to your account to continue
                        </p>
                        <p className="text-xs sm:text-sm lg:text-base text-gray-500">
                            Don&apos;t have an account?{' '}
                            <Link
                                to={"/register"}
                                className="font-bold text-rose-600 hover:text-rose-500 hover:underline transition-colors"
                            >
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Form Card with Modern Design */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 lg:p-16 space-y-6 sm:space-y-8 lg:space-y-10 border border-white/20">
                    {/* Error Message */}
                    {error && (
                        <div className="bg-linear-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-lg p-3 sm:p-5 lg:p-8 animate-pulse">
                            <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                                <span className="text-red-600 text-xl sm:text-3xl lg:text-4xl shrink-0">⚠️</span>
                                <p className="text-xs sm:text-base lg:text-xl text-red-800 font-medium leading-relaxed">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form className="space-y-5 sm:space-y-7 lg:space-y-9" onSubmit={handle}>
                        {/* Email Input */}
                        <div className="space-y-2 sm:space-y-3 lg:space-y-4 group">
                            <label className="block text-sm sm:text-lg lg:text-3xl font-bold text-gray-800">
                                <span className="bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                    Email Address
                                </span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-linear-to-b from-rose-500 to-pink-600 rounded-l-lg sm:rounded-l-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-300"></div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full px-3 sm:px-6 lg:px-12 py-3 sm:py-5 lg:py-8 text-xs sm:text-base lg:text-3xl rounded-lg sm:rounded-2xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-rose-300 hover:bg-white focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-200 disabled:bg-gray-100 disabled:cursor-not-allowed focus:shadow-lg"
                                />
                                <span className="absolute right-3 sm:right-6 lg:right-7 top-1/2 -translate-y-1/2 text-lg sm:text-3xl lg:text-5xl transition-all opacity-100">✉️</span>
                            </div>
                            {email && !email.includes("@") && (
                                <p className="text-xs sm:text-sm lg:text-xl text-yellow-600 flex items-center gap-1">
                                    ⚠️ Please enter a valid email
                                </p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2 sm:space-y-3 lg:space-y-4 group">
                            <label className="block text-sm sm:text-lg lg:text-3xl font-bold text-gray-800">
                                <span className="bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                    Password
                                </span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-linear-to-b from-rose-500 to-pink-600 rounded-l-lg sm:rounded-l-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-300"></div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full px-3 sm:px-6 lg:px-12 py-3 sm:py-5 lg:py-8 text-xs sm:text-base lg:text-3xl rounded-lg sm:rounded-2xl border-2 border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-rose-300 hover:bg-white focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-200 disabled:bg-gray-100 disabled:cursor-not-allowed focus:shadow-lg pr-12 sm:pr-16 lg:pr-20"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 sm:right-6 lg:right-7 top-1/2 -translate-y-1/2 text-lg sm:text-3xl lg:text-5xl transition-all hover:scale-110 focus:outline-none"
                                >
                                    {showPassword ? "👁️" : "👁️‍🗨️"}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-3 sm:px-6 lg:px-12 py-3 sm:py-5 lg:py-8 mt-6 sm:mt-8 lg:mt-12 text-base sm:text-xl lg:text-4xl font-bold text-white bg-linear-to-r from-rose-600 to-pink-600 rounded-lg sm:rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:from-rose-700 hover:to-pink-700 active:scale-95 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-white transform hover:translate-y-0.5"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2 sm:gap-3">
                                    <span className="inline-block animate-spin text-base sm:text-lg lg:text-4xl">⏳</span>
                                    <span className="text-xs sm:text-sm lg:text-lg">Signing in...</span>
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2 sm:gap-3">
                                    <span className="text-xs sm:text-sm lg:text-lg">Sign in</span>
                                    <span className="text-base sm:text-xl lg:text-4xl">→</span>
                                </span>
                            )}
                        </button>
                    </form>

                    
                </div>

                {/* Footer Note */}
                <p className="text-center text-xs sm:text-sm lg:text-2xl text-gray-500 leading-relaxed">
                    🔒 Your data is secure and encrypted
                </p>
            </div>
        </main>
    );
}


