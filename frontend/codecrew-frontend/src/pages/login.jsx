import { useState } from "react";
import useauth from "../hooks/usehook";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)
    const { login } = useauth()
    const navigate = useNavigate();

    const handle = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await api.post("auth/login", { email, password })
            if (res.data.success) {
                login(res.data.token)
                navigate("home")

            } else {
                setError(res.data.message || "login failed")
            }
        } catch (err) {
            setError(err.response?.data?.message || "login failed")
        }

    }

    return (
        <main className="bg-background flex min-h-screen w-full flex-col items-center justify-center sm:px-4">
            <div className="w-full space-y-4 sm:max-w-md">
                <div className="text-center">

                    <div className="mt-5 space-y-2">
                        <h3 className="text-2xl font-bold sm:text-3xl">
                            Log in to your account
                        </h3>
                        <p className="">
                            Don&apos;t have an account?{' '}
                            <Link
                            to={"/register"}
                                className="font-medium text-rose-600 hover:text-rose-500"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="space-y-6 p-4 py-6 shadow sm:rounded-lg sm:p-6">

                    {/* OnSubmit declare yourself */}
                    <form className="space-y-5" onSubmit={handle}>
                        <div>
                            <label className="font-medium">Email</label>
                            <input

                                type="email"
                                value={email}
                                onSubmit={(e) => setemail(e.target.value)}
                                required
                                className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 shadow-sm outline-none focus:border-rose-600"
                            />
                        </div>
                        <div className="relative">
                            <label className="font-medium">Password</label>
                            <div className="relative">
                                <input
                                    type="passowrd"
                                    value={password}
                                    onSubmit={(e) => setpassword(e.target.value)}
                                    required
                                    className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 shadow-sm outline-none focus:border-rose-600"
                                />

                            </div>
                        </div>
                        <button type="submit" disabled={loading} className="w-full rounded-lg bg-rose-600 px-4 py-2 font-medium text-white duration-150 hover:bg-rose-500 active:bg-rose-600">
                            {loading ? "signing in...." : "singup"}
                        </button>
                    </form>
                </div>

            </div>
        </main>
    );
}


