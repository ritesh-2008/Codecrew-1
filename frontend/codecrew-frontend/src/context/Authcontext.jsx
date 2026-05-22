import { useCallback } from "react";
import api from "../api/axios"
import { createContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null);
    const [token, settoken] = useState(localStorage.getItem("token") || null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedtoken = localStorage.getItem("token")
        const storeduser = localStorage.getItem("user")

        if (storedtoken && storeduser) {
            settoken(storedtoken)
            setuser(JSON.parse(storeduser))
        }
        setLoading(false)
    }, [])


    const register = useCallback(async (username, email, password, skills, location) => {
        setError(null);
        try {
            const response = api.post("/auth/register", {
                username,
                email,
                password,
                skills,
                location
            })

            if (response.data.success) {
                const loginres = await api.post("/auth/login", {
                    email,
                    password,
                });

                if (loginres.data.success) {
                    const newtoken = loginres.data.token;
                    const decoded = jwtDecode(newtoken)

                    localStorage.setItem("token", newtoken)
                    localStorage.setItem("user", JSON.stringify({
                        name: username,
                        email,
                        userId: decoded.userId

                    }))
                    settoken(newtoken)
                    setuser({ user: username, email, userId: decoded.userId })
                    return { success: true };

                }
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Registration failed";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    }, []);

    const login = useCallback(async (email, password) => {
        setError(null);
        try {
            const response = await api.post("/auth/login", { email, password })

            if (response.data.success && response.data.token) {
                const newtoken = response.data.token

                const decoded = jwtDecode(newtoken)

                localStorage.setItem("token", newtoken)
                localStorage.setItem("user", JSON.stringify({
                    name: "User",
                    email: email,
                    userId: decoded.userId,

                }))
                settoken(newtoken)
                setuser({ name: "User", email, userId: decoded.userId })
                return { success: true }
            } else {
                throw new Error(response.data.message || "invalid reponse from server")
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Login failed";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    }, []);


    const logout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setuser(null);
        settoken(null);
        setError(null);
    }, [])

    const value = {
        user,
        token,
        loading,
        error,
        register,
        login,
        logout,
        isAuthenticated: !!token,
        api
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}